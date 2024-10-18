import { Component } from '@angular/core';
import { TransaccionMesInterface } from 'src/app/interfaces/transaccion-mes.interface';
import { WidgetService } from 'src/app/services/widget.service';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { TransaccionService } from 'src/app/services/transaccion.service';
import { ResApiInterface } from 'src/app/interfaces/res-api.interface';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss'],
  providers: [
    WidgetService,
    TransaccionService,
  ]
})
export class HistoryComponent {


  idCuenta: number = 0;
  isLoading: boolean = false;
  transactions: TransaccionMesInterface[] = [];
  monthView:Date = new Date();
  mesesAnteriores: { mes: string, año: number }[] = [];

  /**
   *
   */
  constructor(
    private _location: Location,
    private _widgetService: WidgetService,
    private _route: ActivatedRoute,
    private _transaccionService:TransaccionService,
  ) {

  }
  ngOnInit(): void {
    this.idCuenta = Number(this._route.snapshot.paramMap.get('idCuenta'));
    this.loadData();
  }



  async loadData() {
    this.isLoading = true;
    await this.loadTransactions();
    this.isLoading = false;

  }

  generarMesesAnteriores(mes: number, año: number) {
    for (let i = 0; i < 6; i++) {
      const fecha = new Date(año, mes - i - 1); // Restamos 1 porque los meses empiezan en 0 en JavaScript
      const nombreMes = fecha.toLocaleString('es-ES', { month: 'long' }); // Obtener nombre del mes en español
      const añoMes = fecha.getFullYear();
      
      this.mesesAnteriores.push({ mes: nombreMes, año: añoMes });
    }
  }

  async loadTransactions(): Promise<boolean> {
    const api = () => this._transaccionService.getTransaccionMes(
      this.idCuenta,
      this.monthView.getMonth() + 1,
      this.monthView.getFullYear(),
    );

    const res: ResApiInterface = await ApiService.apiUse(api);

    if (!res.success) {
      this._widgetService.openSnackbar("Algo salió mal, intentalo mas tarde.");
      console.error(res);
      return false;
    }

    this.transactions = res.data;

    return true;
  }

  backPage() {
    this._location.back();
  }

}
