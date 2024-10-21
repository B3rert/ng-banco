import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CuentaNumeroInterface } from 'src/app/interfaces/cuenta-numero.interface';
import { ResApiInterface } from 'src/app/interfaces/res-api.interface';
import { ApiService } from 'src/app/services/api.service';
import { CuentaService } from 'src/app/services/cuenta.service';
import { WidgetService } from 'src/app/services/widget.service';
import { SelectAccountComponent } from '../select-account/select-account.component';
import { FormControl, FormGroup } from '@angular/forms';
import { TransaccionService } from 'src/app/services/transaccion.service';
import { TransaccionMesInterface } from 'src/app/interfaces/transaccion-mes.interface';

@Component({
  selector: 'app-status-account',
  templateUrl: './status-account.component.html',
  styleUrls: ['./status-account.component.scss'],
  providers: [
    CuentaService,
    WidgetService,
    TransaccionService,
  ]
})
export class StatusAccountComponent {

  range = new FormGroup({
    start: new FormControl(),
    end: new FormControl(),
  });

  isLoading: boolean = false;
  cui: string = "";
  account?: CuentaNumeroInterface;
  transactions: TransaccionMesInterface[] = [];

  /**
   *
   */
  constructor(
    private _location: Location,
    private _cuentaService: CuentaService,
    private _widgetService: WidgetService,
    private _dialog: MatDialog,
    private _transaccionService: TransaccionService,

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

    this.isLoading = true;
    const api = () => this._cuentaService.getCuentaDpi(this.cui);
    this.isLoading = false;

    const res: ResApiInterface = await ApiService.apiUse(api);

    if (!res.success) {
      this._widgetService.openSnackbar("Algo salió mal, intentalo mas tarde.");
      console.error(res);
      return false;
    }

    let accounts: CuentaNumeroInterface[] = res.data;

    if (accounts.length == 0) {
      this._widgetService.openSnackbar("Ninguna coincidencias.")
      return false;
    }

    if (accounts.length == 1) {
      this.account = accounts[0];
      return true;
    }

    //abir diaogo 
    //TODO:verificar que se haga scroll
    //Abiri dialogo con informacion de la cuenta
    const dialogRef = this._dialog.open(SelectAccountComponent, {
      width: '500px',
      data: accounts,
    });

    dialogRef.afterClosed().subscribe(async result => {

      if (result) {
        this.account = result;
      }
    });


    return true;
  }

  async ok() {

    if (!this.account) {
      this._widgetService.openSnackbar("Seleccione una cuenta");
      return;
    }

    if (!this.range.value.start || this.range.value.end) {

      this._widgetService.openSnackbar("Selecciona uun rango de fecha.")

      return;
    }

    this.isLoading = true;
    let res :boolean= await this.loadTransactions();
    this.isLoading = false;

    if(!res) return;


    //generar informe
  }
    
  async loadTransactions(): Promise<boolean> {

    this.transactions = [];
    const api = () => this._transaccionService.getTransaccionRango(
      this.account!.id,
      this.range.value.start, 
      this.range.value.end,
    );

    const res: ResApiInterface = await ApiService.apiUse(api);

    if (!res.success) {
      this._widgetService.openSnackbar("Algo salió mal, intentalo mas tarde.");
      console.error(res);
      return false;
    }

    this.transactions = res.data;

    if(this.transactions.length == 0){
      this._widgetService.openSnackbar("No hay transacciones para la fecha seleccionada.");
      return false;
    }

    return true;
  }
}
