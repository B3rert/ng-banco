import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { CuentaUserInterface } from 'src/app/interfaces/cuenta-user.interface';
import { CuentaService } from 'src/app/services/cuenta.service';
import { ResApiInterface } from 'src/app/interfaces/res-api.interface';
import { ApiService } from 'src/app/services/api.service';
import { WidgetService } from 'src/app/services/widget.service';
import { CuentaNumeroInterface } from 'src/app/interfaces/cuenta-numero.interface';
import { MatDialog } from '@angular/material/dialog';
import { MonthsFilterComponent } from '../months-filter/months-filter.component';
import { InfoAccountComponent } from '../info-account/info-account.component';
import { TransaccionService } from 'src/app/services/transaccion.service';
import { NewTraInterface } from 'src/app/interfaces/new-tra.interface';
import { TransaccionInterface } from 'src/app/interfaces/transaccion.interface';
import { SuccessTraInterface } from 'src/app/interfaces/success-tra.interface';
import { SuccesTraComponent } from '../succes-tra/succes-tra.component';

@Component({
  selector: 'app-transfer',
  templateUrl: './transfer.component.html',
  styleUrls: ['./transfer.component.scss'],
  providers: [
    CuentaService,
    WidgetService,
    TransaccionService,
  ]
})
export class TransferComponent implements OnInit {
  isLoading: boolean = false;

  typeTra: any;

  typesTra: any[] = [
    {
      id: 1,
      name: 'Transferencia local',
    },
    {
      id: 2,
      name: 'Transferencia a terceros',
    },
    {
      id: 3,
      name: 'Transferencia a otro bancos',
    }
  ];

  accounts: CuentaUserInterface[] = [];
  debit?: CuentaUserInterface;
  credit?: CuentaUserInterface;
  monto = "";
  comment = "";
  numberAccount = "";
  cuentaNumero?: CuentaNumeroInterface;
  traSuccess?: TransaccionInterface;

  constructor(
    private _location: Location,
    private _cuentaService: CuentaService,
    private _widgetService: WidgetService,
    private _dialog: MatDialog,
    private _transaccionService: TransaccionService,

  ) {
  }

  ngOnInit(): void {

    this.typeTra = this.typesTra[0];
    this.loadData();

  }

  backPage() {
    this._location.back();
  }

  async loadData() {
    this.isLoading = true;
    await this.getAccounts();
    this.isLoading = false;
  }


  async getAccounts(): Promise<boolean> {

    const user = sessionStorage.getItem("user");
    const api = () => this._cuentaService.getCuentaUser(user!);

    const res: ResApiInterface = await ApiService.apiUse(api);

    if (!res.success) {
      this._widgetService.openSnackbar("Algo salió mal, intentalo mas tarde.");
      console.error(res);
      return false;
    }

    this.accounts = res.data;



    return true;
  }



  async getAccountNumber(): Promise<boolean> {
    this.isLoading = true;

    const api = () => this._cuentaService.getCuentaNumero(this.numberAccount);

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

        this.numberAccount = `${cunetasNumero[0].numero_cuenta} ${cunetasNumero[0].nombre_completo}`;
        this.cuentaNumero = cunetasNumero[0];

      }
    });


    return true;
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

  async transfer() {

    //Validar campos

    if (
      !this.debit ||
      !this.monto ||
      !this.comment ||
      (this.typeTra.id == 1 && !this.credit) ||
      (this.typeTra.id == 2 && !this.cuentaNumero)
    ) {

      this._widgetService.openSnackbar("Por favor, completa todos los campos.");
      return;

    }

    //validar que le monto sea correcto
    if (!this.esNumerico(this.monto)) {
      this._widgetService.openSnackbar("EL monto no es valido");
      return;
    }

    //validar que el monto  pueda debitarse
    if (Number(this.monto) > this.debit!.saldo) {
      this._widgetService.openSnackbar("Sin saldo suficiente en la cuenta a debitar.")
      return;
    }

    if (
      this.typeTra.id == 1
    ) {
      if (this.credit!.id == this.debit.id) {
        this._widgetService.openSnackbar("La cuenta a debitar y la cuenta a acreditar deben ser distintas")
        return;
      }
    }

    
    if (
      this.typeTra.id == 2
    ) {
      if (this.cuentaNumero!.id == this.debit.id) {
        this._widgetService.openSnackbar("La cuenta a debitar y la cuenta a acreditar deben ser distintas")
        return;
      }
    }


    //TODO: Agregar dialogo de confirmacion

    let userId: number = Number(sessionStorage.getItem("id"));

    //realizar debito
    let debitTra: NewTraInterface = {
      cuentaId: this.debit!.id,
      desc: 'Transferencia',
      monto: Number(this.monto),
      tipoTra: 8, //transferencia
      userId: userId,
    }

    let creditTra: NewTraInterface = {
      cuentaId: this.typeTra.id == 2 ? this.cuentaNumero!.id : this.credit!.id,
      desc: 'Transferencia',
      monto: Number(this.monto),
      tipoTra: 6,
      userId: userId,
    }

    this.isLoading = true;


    //TODO: unificar proceso en un solo proceimiento almaenado
    let redDebit: boolean = await this.postTra(debitTra);

    if (!redDebit) {

      this.isLoading = false;
      this._widgetService.openSnackbar("Error al realizar la transferencia");
      return;
    }

    let resCredit: boolean = await this.postTra(creditTra);

    if (!resCredit) {
      this.isLoading = false;
      this._widgetService.openSnackbar("Error al realizar la transferencia");
      return;
    }

    await this.getAccounts();

    this.isLoading = false;

    let cuentaOrigen: CuentaNumeroInterface = {
      id: 0,
      nombre_completo: "", //TODO:Agregar nombre
      numero_cuenta: this.debit!.numero_cuenta,
      tipo_cuenta: this.debit!.tipo_cuenta,
    }
    let cuentaDestino: CuentaNumeroInterface = {
      id: 0,
      nombre_completo: this.typeTra.id == 1 ? "" : this.cuentaNumero!.nombre_completo,
      numero_cuenta: this.typeTra.id == 1 ? this.credit!.numero_cuenta : this.cuentaNumero!.numero_cuenta,
      tipo_cuenta: this.typeTra.id == 1 ? this.credit!.tipo_cuenta : this.cuentaNumero!.tipo_cuenta,
    }
    let transfer: SuccessTraInterface = {
      comentario: this.comment,
      cuentaDestino: cuentaDestino,
      cuentaOrigen: cuentaOrigen,
      fecha: this.traSuccess!.fecha,
      id: this.traSuccess!.id,
      monto: Number(this.monto),
    }

    this._dialog.open(SuccesTraComponent, {
      width: '500px',
      data: transfer,
    });

    //Empty Form
    this.debit = undefined;
    this.credit = undefined,
      this.cuentaNumero = undefined,
      this.numberAccount = "";
    this.monto = "";
    this.comment = "";


  }

  esNumerico(texto: string): boolean {
    return !isNaN(Number(texto)) && texto.trim() !== '';
  }

}
