import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { ClienteInterface } from 'src/app/interfaces/cliente.interface';
import { NewUserInterface } from 'src/app/interfaces/new-user.interface';
import { ResApiInterface } from 'src/app/interfaces/res-api.interface';
import { RolInterface } from 'src/app/interfaces/rol.interface';
import { UserInterface as UsuarioInterface } from 'src/app/interfaces/user.interface';
import { ApiService } from 'src/app/services/api.service';
import { ClienteService } from 'src/app/services/cliente.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { WidgetService } from 'src/app/services/widget.service';

@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.scss'],
  providers: [
    WidgetService,
    UsuarioService,
  ]
})
export class NewUserComponent implements OnInit{

  isLoading: boolean = false;

  nombres:string = "";
  apellidos:string = "";
  roles:RolInterface[] = [];
  rol?:RolInterface;
  user?:UsuarioInterface;


  /**
   *
   */
  constructor(
    private _location:Location,
    private _widgetService: WidgetService,
    private _userService:UsuarioService,
  ) {
    
  }
  ngOnInit(): void {
  }

  backPage(){
    this._location.back();
  }

 async confirmAccount(){
    if (
      !this.nombres ||
      !this.apellidos ||
      !this.rol
    ) {
      this._widgetService.openSnackbar("Por favor, completa todos los campos");
      return;
    }

    this.isLoading = true;

    let resUser = await this.createUser();
   
    this.isLoading = false;


    this._widgetService.openSnackbar("Cuenta creada exitosamente");
    
    //TODO:Generar informe


    //Limpiar formulario
    this.emptyForm();
  }

  
  async createUser(): Promise<boolean> {

    const user: NewUserInterface = {
      apellido: this.nombres,
      nombre: this.apellidos,
      rol: this.rol!.id,  
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
  

  emptyForm() {
    this.rol = undefined;
    this.nombres = "";
    this.apellidos = "";
    this.user = undefined;
  }



}
