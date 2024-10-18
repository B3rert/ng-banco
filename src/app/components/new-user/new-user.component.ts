import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { ClienteInterface } from 'src/app/interfaces/cliente.interface';
import { ResApiInterface } from 'src/app/interfaces/res-api.interface';
import { RolInterface } from 'src/app/interfaces/rol.interface';
import { ApiService } from 'src/app/services/api.service';
import { ClienteService } from 'src/app/services/cliente.service';
import { WidgetService } from 'src/app/services/widget.service';

@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.scss'],
  providers: [
    WidgetService,
    ClienteService,
  ]
})
export class NewUserComponent implements OnInit{

  isLoading: boolean = false;
  cui: string = "";
  fechaNacimiento?: NgbDateStruct;


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

  roles:RolInterface[] = [];
  rol?:RolInterface;


  /**
   *
   */
  constructor(
    private _location:Location,
    private _widgetService: WidgetService,
    private _clienteService: ClienteService,
  ) {
    
  }
  ngOnInit(): void {
  }

  backPage(){
    this._location.back();
  }

  confirmAccount(){

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

  async searchCui() {

    if (!this.cui) {
      this._widgetService.openSnackbar("Ingresa un CUI para buscar");

      return;
    }


    this.isLoading = true;
    let res = await this.loadClienteCui();
    this.isLoading = false;



  }

}
