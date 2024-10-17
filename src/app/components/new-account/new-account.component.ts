import { Component, OnInit } from '@angular/core';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap/datepicker/datepicker.module';
import { ResApiInterface } from 'src/app/interfaces/res-api.interface';
import { TipoCuentaInterface } from 'src/app/interfaces/tipo-cuenta.interface';
import { ApiService } from 'src/app/services/api.service';
import { CuentaService } from 'src/app/services/cuenta.service';
import { WidgetService } from 'src/app/services/widget.service';

@Component({
  selector: 'app-new-account',
  templateUrl: './new-account.component.html',
  styleUrls: ['./new-account.component.scss'],
  providers: [
    WidgetService,
    CuentaService,
  ]
})
export class NewAccountComponent implements OnInit {

  isLoading: boolean = false;
  model?: NgbDateStruct;
  tiposCuenta: TipoCuentaInterface[] = [];
  tipoCuenta?:TipoCuentaInterface;


  /**
   *
   */
  constructor(
    private _cuentaService: CuentaService,
    private _widgetService: WidgetService,
  ) {


  }

  ngOnInit(): void {

    this.loadData();
  }

  

  async loadData() {
    this.isLoading = true;
    await this.loadTipoCuenta();
    this.isLoading = false;
  }


  async loadTipoCuenta(): Promise<boolean> {
    const api = () => this._cuentaService.getTipoCuenta();

    const res: ResApiInterface = await ApiService.apiUse(api);

    if (!res.success) {
      this._widgetService.openSnackbar("Algo salió mal, intentalo mas tarde.");
      console.error(res);
      return false;
    }

    this.tiposCuenta = res.data;

    return true;
  }

  searchCui() {

  }
}
