import { Component } from '@angular/core';
import { TransaccionMesInterface } from 'src/app/interfaces/transaccion-mes.interface';
import { WidgetService } from 'src/app/services/widget.service';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { TransaccionService } from 'src/app/services/transaccion.service';
import { ResApiInterface } from 'src/app/interfaces/res-api.interface';
import { ApiService } from 'src/app/services/api.service';
import { MatDialog } from '@angular/material/dialog';
import { MonthsFilterComponent } from '../months-filter/months-filter.component';
import { FilterMonthInterface } from 'src/app/interfaces/filter-month.interface';

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


  monthSelect?: FilterMonthInterface;

  /**
   *
   */
  constructor(
    private _location: Location,
    private _widgetService: WidgetService,
    private _route: ActivatedRoute,
    private _transaccionService: TransaccionService,
    private _dialog: MatDialog
  ) {

  }
  ngOnInit(): void {
    const fecha = new Date(); // Restamos 1 porque los meses empiezan en 0 en JavaScript
    const month = fecha.toLocaleString('es-ES', { month: 'long' }); // Obtener nombre del mes en español
    const year = fecha.getFullYear();

    this.monthSelect = {
      
      month: fecha.getMonth(),
      monthName: month,
      year: year,
    }

    this.idCuenta = Number(this._route.snapshot.paramMap.get('idCuenta'));
    this.loadData();
  }



  async loadData() {
    this.isLoading = true;
    await this.loadTransactions();
    this.isLoading = false;

  }


  openMonthFilter() {


    const dialogRef = this._dialog.open(MonthsFilterComponent, {
      width: '500px',
      data: this.monthSelect,
    });

    dialogRef.afterClosed().subscribe( async result => {

      if(result){
        this.monthSelect = result;

        this.isLoading = true;
        await this.loadTransactions();
        this.isLoading = false;
      }
    });
  }


  async loadTransactions(): Promise<boolean> {
    const api = () => this._transaccionService.getTransaccionMes(
      this.idCuenta,
      this.monthSelect!.month +1, 
      this.monthSelect!.year,
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
