import { Component, OnInit } from '@angular/core';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap/datepicker/datepicker.module';
import { ClienteInterface } from 'src/app/interfaces/cliente.interface';
import { CuentaInterface } from 'src/app/interfaces/cuenta.interface';
import { NewAccountInterface } from 'src/app/interfaces/new-account.interface';
import { NewUserInterface } from 'src/app/interfaces/new-user.interface';
import { ResApiInterface } from 'src/app/interfaces/res-api.interface';
import { TipoCuentaInterface } from 'src/app/interfaces/tipo-cuenta.interface';
import { UserInterface } from 'src/app/interfaces/user.interface';
import { ApiService } from 'src/app/services/api.service';
import { ClienteService } from 'src/app/services/cliente.service';
import { CuentaService } from 'src/app/services/cuenta.service';
import { UserService } from 'src/app/services/usuario.service';
import { WidgetService } from 'src/app/services/widget.service';

@Component({
  selector: 'app-new-account',
  templateUrl: './new-account.component.html',
  styleUrls: ['./new-account.component.scss'],
  providers: [
    WidgetService,
    CuentaService,
    ClienteService,
    UserService,
  ]
})
export class NewAccountComponent implements OnInit {

  isLoading: boolean = false;
  fechaNacimiento?: NgbDateStruct;
  tiposCuenta: TipoCuentaInterface[] = [];
  tipoCuenta?: TipoCuentaInterface;
  cui: string = "";

  cliente: ClienteInterface = {
    apellido: "",
    direccion: "",
    dpi: "",
    fecha_nacimiento: new Date(),
    nombre: "",
    telefono: "",
    usuario_id: 0,
    correo: ""
  };

  user?: UserInterface;
  cuenta?: CuentaInterface;


  /**
   *
   */
  constructor(
    private _cuentaService: CuentaService,
    private _widgetService: WidgetService,
    private _clienteService: ClienteService,
    private _userService: UserService,
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


  async createAccount() {


    const newCuenta: NewAccountInterface = {
      cliente_id: this.cliente.id!,
      tipo_cuenta_id: this.tipoCuenta!.id,
    }

    const api = () => this._cuentaService.postCuenta(newCuenta);

    const res: ResApiInterface = await ApiService.apiUse(api);

    if (!res.success) {
      this._widgetService.openSnackbar("Algo salió mal, intentalo mas tarde.");
      console.error(res);
      return false;
    }

    this.cuenta = res.data;

    return true;
  }

  async loadClienteCui(): Promise<boolean> {
    const api = () => this._clienteService.getTipoCuentaDpi(this.cui);

    const res: ResApiInterface = await ApiService.apiUse(api);

    if (!res.success) {
      this._widgetService.openSnackbar("Algo salió mal, intentalo mas tarde.");
      console.error(res);
      return false;
    }

    if (res.data == "Cliente no encontrado.") {
      this._widgetService.openSnackbar("Cliente no encontrado.");
      return false;
    }

    this.cliente = res.data;


    let date = new Date(this.cliente.fecha_nacimiento)

    this.fechaNacimiento = {
      year: date.getFullYear(),
      day: date.getDate() + 1,
      month: date.getMonth(),
    }

    return true;
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

  async searchCui() {

    if (!this.cui) {
      this._widgetService.openSnackbar("Inggresa un CUI para buscar");

      return;
    }


    this.isLoading = true;
    let res = await this.loadClienteCui();
    this.isLoading = false;



  }

  async createUser() {

    const user: NewUserInterface = {
      apellido: this.cliente.apellido,
      nombre: this.cliente.nombre,
      rol: 4,// ROl: usuario,  
    }

    const api = () => this._userService.postUser(user);

    const res: ResApiInterface = await ApiService.apiUse(api);

    if (!res.success) {
      this._widgetService.openSnackbar("Algo salió mal, intentalo mas tarde.");
      console.error(res);
      return false;
    }

    this.user = res.data;

    return true;
  }


  async createClient() {


    const api = () => this._clienteService.postCliente(this.cliente);

    const res: ResApiInterface = await ApiService.apiUse(api);

    if (!res.success) {
      this._widgetService.openSnackbar("Algo salió mal, intentalo mas tarde.");
      console.error(res);
      return false;
    }

    this.cliente = res.data;

    return true;
  }

  async confirmAccount() {

    if (
      !this.cui ||
      !this.cliente.nombre ||
      !this.cliente.apellido ||
      !this.cliente.direccion ||
      !this.fechaNacimiento ||
      !this.cliente.telefono ||
      !this.cliente.correo ||
      !this.tipoCuenta
    ) {
      this._widgetService.openSnackbar("Por favor, completa todos los campos");
      return;
    }

    this.isLoading = true;

    if (!this.cliente.id) {

      //crear usuario
      let resUser = await this.createUser();


      if (!resUser) {
        this.isLoading = false;
        return;
      }


      //crear cliente
      let resClient = await this.createClient();

      if (!resClient) {
        this.isLoading = false;
        return;
      }

    }

    let resCuenta = await this.createAccount();

    if (!resCuenta) {
      this.isLoading = false;
      return;
    }


    //si la cuenat es monetaria crear tarjeta
    if(this.tipoCuenta.id == 2){

      //crear tarjeta
    }

    this.isLoading = false;



  }
}
