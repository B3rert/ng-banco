import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { TipoTransaccionInterface } from 'src/app/interfaces/tipo-transaccion.interface';
import { TransaccionService } from 'src/app/services/transaccion.service';
import { ResApiInterface } from 'src/app/interfaces/res-api.interface';
import { ApiService } from 'src/app/services/api.service';
import { WidgetService } from 'src/app/services/widget.service';
import { CuentaService } from 'src/app/services/cuenta.service';
import { CuentaNumeroInterface } from 'src/app/interfaces/cuenta-numero.interface';
import { InfoAccountComponent } from '../info-account/info-account.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.scss'],
  providers: [
    TransaccionService,
    WidgetService,
    CuentaService,
  ]
})
export class ServicesComponent implements OnInit {
  isLoading: boolean = false;
  tiposTransaccion: TipoTransaccionInterface[] = [];
  tipoTransaccion!: TipoTransaccionInterface;
  inputCuentaDeposito: string = "";
  inputCuentaRetiro: string = "";
  inputDpi: string = "";
  cuentaDeposito?: CuentaNumeroInterface;
  cuentaRetiro?: CuentaNumeroInterface;
  monto: string = "";
  comment: string = "";
  /**
   *
   */
  constructor(
    private readonly _location: Location,
    private readonly _transaccionService: TransaccionService,
    private readonly _widgetService: WidgetService,
    private readonly _cuentaService: CuentaService,
    private _dialog: MatDialog,
  ) {


  }
  ngOnInit(): void {
    this.loadData();
  }


  async loadData() {
    this.isLoading = true;
    await this.loadTipoTra();
    this.isLoading = false;
  }

  backPage() {
    this._location.back();
  }

  confirmTra() {

  }

  async searchAccountRet(): Promise<boolean> {

    if (!this.inputCuentaRetiro) {

      this._widgetService.openSnackbar("Ingresa una cuenta para buscar");

      return false;
    }

    this.isLoading = true;

    const api = () => this._cuentaService.getCuentaNumeroDpi(this.inputCuentaRetiro, this.inputDpi);

    const res: ResApiInterface = await ApiService.apiUse(api);

    this.isLoading = false;


    if (!res.success) {
      this._widgetService.openSnackbar("Algo salió mal, intentalo mas tarde.");
      console.error(res);
      return false;
    }

    let cunetasNumero: CuentaNumeroInterface[] = res.data;


    if (cunetasNumero.length == 0) {
      this._widgetService.openSnackbar("No hay coincidencias");
      return false;
    }

    //Abiri dialogo con informacion de la cuenta
    const dialogRef = this._dialog.open(InfoAccountComponent, {
      width: '500px',
      data: cunetasNumero[0],
    });

    dialogRef.afterClosed().subscribe(async result => {

      if (result) {

        this.inputCuentaRetiro = `${cunetasNumero[0].numero_cuenta} ${cunetasNumero[0].nombre_completo}`;
        this.cuentaRetiro = cunetasNumero[0];

      }
    });


    return true;
  }

  async searchAccountDep(): Promise<boolean> {


    if (!this.inputCuentaDeposito) {

      this._widgetService.openSnackbar("Ingresa una cuenta para buscar");

      return false;
    }

    this.isLoading = true;

    const api = () => this._cuentaService.getCuentaNumero(this.inputCuentaDeposito);

    const res: ResApiInterface = await ApiService.apiUse(api);

    this.isLoading = false;


    if (!res.success) {
      this._widgetService.openSnackbar("Algo salió mal, intentalo mas tarde.");
      console.error(res);
      return false;
    }

    let cunetasNumero: CuentaNumeroInterface[] = res.data;


    if (cunetasNumero.length == 0) {
      this._widgetService.openSnackbar("No hay coincidencias");
      return false;
    }

    //Abiri dialogo con informacion de la cuenta
    const dialogRef = this._dialog.open(InfoAccountComponent, {
      width: '500px',
      data: cunetasNumero[0],
    });

    dialogRef.afterClosed().subscribe(async result => {

      if (result) {

        this.inputCuentaDeposito = `${cunetasNumero[0].numero_cuenta} ${cunetasNumero[0].nombre_completo}`;
        this.cuentaDeposito = cunetasNumero[0];

      }
    });


    return true;
  }

  async loadTipoTra(): Promise<boolean> {
    const api = () => this._transaccionService.getTipoTransaccion();

    const res: ResApiInterface = await ApiService.apiUse(api);

    if (!res.success) {
      this._widgetService.openSnackbar("Algo salió mal, intentalo mas tarde.");
      console.error(res);
      return false;
    }

    this.tiposTransaccion = res.data;

    if(this.tiposTransaccion.length> 0){
      this.tipoTransaccion = this.tiposTransaccion[0];
    }

    return true;
  }
}
