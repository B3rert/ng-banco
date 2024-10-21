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
import { CuentaNumeroDpiInterface } from 'src/app/interfaces/cuenta-numero-dpi.interface';
import { NewTraInterface } from 'src/app/interfaces/new-tra.interface';
import { SuccessTraInterface } from 'src/app/interfaces/success-tra.interface';
import { SuccesTraComponent } from '../succes-tra/succes-tra.component';
import { TransaccionInterface } from 'src/app/interfaces/transaccion.interface';

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
  cuentaRetiro?: CuentaNumeroDpiInterface;
  monto: string = "";
  comment: string = "";
  traSuccess?: TransaccionInterface;

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

  async confirmTra() {
    //validar campos
    if (this.tipoTransaccion.id == 6) { //6 deposito
      if (
        !this.cuentaDeposito ||
        !this.monto ||
        !this.comment
      ) {
        this._widgetService.openSnackbar("Por favor llena todos los campos.")
        return;
      }
    }

    if (this.tipoTransaccion.id == 7) { //7 retiro
      if (
        !this.cuentaRetiro ||
        !this.monto ||
        !this.comment
      ) {
        this._widgetService.openSnackbar("Por favor llena todos los campos.")
        return;
      }
    }

    if (!this.esNumerico(this.monto)) {
      this._widgetService.openSnackbar("Monto invalido.")
      return;
    }

    if (this.tipoTransaccion.id == 7) {
      if (Number(this.monto) > this.cuentaRetiro!.saldo) {
        this._widgetService.openSnackbar("Saldo en la cuenta insuficiente.");
        return;
      }
    }


    //realizar movimiento
    //TODO: Agregar dialogo de confirmacion

    let userId: number = Number(sessionStorage.getItem("id"));

    let tra: NewTraInterface = {
      cuentaId: this.tipoTransaccion.id == 6 ? this.cuentaDeposito!.id : this.cuentaRetiro!.id,
      desc: this.tipoTransaccion.nombre,
      monto: Number(this.monto),
      tipoTra: this.tipoTransaccion.id,
      userId: userId,
    }

    this.isLoading = true;


    let resTra: boolean = await this.postTra(tra);

    if (!resTra) {
      this.isLoading = false;
      this._widgetService.openSnackbar("Error al realizar la transferencia");
      return;
    }

    this.isLoading = false;


    let cuentaTra: CuentaNumeroInterface = {
      id: 0,
      nombre_completo: this.tipoTransaccion.id == 6 ? this.cuentaDeposito!.nombre_completo : this.cuentaRetiro!.nombre_completo,
      numero_cuenta: this.tipoTransaccion.id == 6 ? this.cuentaDeposito!.numero_cuenta : this.cuentaRetiro!.numero_cuenta,
      tipo_cuenta: this.tipoTransaccion.id == 6 ? this.cuentaDeposito!.tipo_cuenta : this.cuentaRetiro!.tipo_cuenta,
    }

    let transfer: SuccessTraInterface = {
      cuenta: cuentaTra,
      comentario: this.comment,
      fecha: this.traSuccess!.fecha,
      id: this.traSuccess!.id,
      tipoTra:this.tipoTransaccion.nombre,
      monto: Number(this.monto),
    }

    this._dialog.open(SuccesTraComponent, {
      width: '500px',
      data: transfer,
    });

    //Empty Form
    this.cuentaDeposito = undefined;
    this.cuentaRetiro = undefined;
    this.inputCuentaDeposito = "";
    this.inputCuentaRetiro = "";
    this.inputDpi = "";
    this.monto = "";
    this.comment = "";

  }


  async postTra(tra: NewTraInterface): Promise<boolean> {


    const api = () => this._transaccionService.postTra(tra)
    const res: ResApiInterface = await ApiService.apiUse(api);

    if (!res.success) {
      this._widgetService.openSnackbar("Algo salió mal, intentalo mas tarde.");
      console.error(res);
      return false;
    }

    let trans: TransaccionInterface[] = res.data;

    if (trans.length == 0) {
      return false;
    }

    this.traSuccess = trans[0];

    return true;
  }

  esNumerico(texto: string): boolean {
    return !isNaN(Number(texto)) && texto.trim() !== '';
  }

  async searchAccountRet(): Promise<boolean> {

    if (!this.inputCuentaRetiro || !this.inputDpi) {

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

    let cunetasNumero: CuentaNumeroDpiInterface[] = res.data;


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

    if (this.tiposTransaccion.length > 0) {
      this.tipoTransaccion = this.tiposTransaccion[0];
    }

    return true;
  }
}
