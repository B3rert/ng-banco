import { Component, OnInit } from '@angular/core';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap/datepicker/datepicker.module';
import { ClienteInterface } from 'src/app/interfaces/cliente.interface';
import { ResApiInterface } from 'src/app/interfaces/res-api.interface';
import { TipoCuentaInterface } from 'src/app/interfaces/tipo-cuenta.interface';
import { ApiService } from 'src/app/services/api.service';
import { ClienteService } from 'src/app/services/cliente.service';
import { CuentaService } from 'src/app/services/cuenta.service';
import { WidgetService } from 'src/app/services/widget.service';

@Component({
  selector: 'app-new-account',
  templateUrl: './new-account.component.html',
  styleUrls: ['./new-account.component.scss'],
  providers: [
    WidgetService,
    CuentaService,
    ClienteService,
  ]
})
export class NewAccountComponent implements OnInit {

  isLoading: boolean = false;
  fechaNacimiento?: NgbDateStruct;
  tiposCuenta: TipoCuentaInterface[] = [];
  tipoCuenta?:TipoCuentaInterface;
  cui:string = "";

  cliente:ClienteInterface ={
    apellido:"",
    direccion:"",
    dpi:"",
    fecha_nacimiento: new Date(),
    id:0,
    nombre:"",
    telefono:"",
    usuario_id:0
  };


  /**
   *
   */
  constructor(
    private _cuentaService: CuentaService,
    private _widgetService: WidgetService,
    private _clienteService:ClienteService,
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


  async loadClienteCui():Promise<boolean>{
    const api = () => this._clienteService.getTipoCuentaDpi(this.cui);

    const res: ResApiInterface = await ApiService.apiUse(api);

    if (!res.success) {
      this._widgetService.openSnackbar("Algo salió mal, intentalo mas tarde.");
      console.error(res);
      return false;
    }

    if(res.data == "Cliente no encontrado."){
      this._widgetService.openSnackbar("Cliente no encontrado.");
      return false;
    }

    this.cliente = res.data;

    
    let date = new Date(this.cliente.fecha_nacimiento)

    this.fechaNacimiento = {
      year:date.getFullYear(),
      day: date.getDate() +1,
      month :date.getMonth(),
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

    if(!this.cui){
      this._widgetService.openSnackbar("Inggresa un CUI para buscar");

      return;
    }


    this.isLoading = true;
    let res =  await this.loadClienteCui();
    this.isLoading = false;



  }
}
