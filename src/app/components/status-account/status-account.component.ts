import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { CuentaNumeroInterface } from 'src/app/interfaces/cuenta-numero.interface';
import { ResApiInterface } from 'src/app/interfaces/res-api.interface';
import { ApiService } from 'src/app/services/api.service';
import { CuentaService } from 'src/app/services/cuenta.service';
import { WidgetService } from 'src/app/services/widget.service';

@Component({
  selector: 'app-status-account',
  templateUrl: './status-account.component.html',
  styleUrls: ['./status-account.component.scss'],
  providers: [
    CuentaService,
    WidgetService,
  ]
})
export class StatusAccountComponent {

  isLoading: boolean = false;
  cui: string = "";
  account?: CuentaNumeroInterface;
  /**
   *
   */
  constructor(
    private _location: Location,
    private _cuentaService: CuentaService,
    private _widgetService: WidgetService,
  ) {

  }

  backPage() {
    this._location.back();
  }

  async searchAccountsCui(): Promise<boolean> {

    if (!this.cui) {
      this._widgetService.openSnackbar("Ingresa un CUI para busacar.")
      return false;
    }

    this.account = undefined;

    const api = () => this._cuentaService.getCuentaDpi(this.cui);

    const res: ResApiInterface = await ApiService.apiUse(api);

    if (!res.success) {
      this._widgetService.openSnackbar("Algo salió mal, intentalo mas tarde.");
      console.error(res);
      return false;
    }

    let accounts: CuentaNumeroInterface[] = res.data;

    if (accounts.length == 1) {
      this.account = accounts[0];
      return true;
    }

    //abir diaogo 


    return true;
  }
}
