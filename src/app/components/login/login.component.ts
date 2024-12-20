import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ResApiInterface } from 'src/app/interfaces/res-api.interface';
import { CredencialInterface } from 'src/app/interfaces/credencial.interface';
import { UsuarioService } from 'src/app/services/usuario.service';
import { WidgetService } from 'src/app/services/widget.service';
import { UserInterface } from 'src/app/interfaces/user.interface';
import { MatDialog } from '@angular/material/dialog';
import { ActivateUserComponent } from '../activate-user/activate-user.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [
    UsuarioService,
    WidgetService,
  ]
})
export class LoginComponent implements OnInit {
  //Declaracion de variables a utilizar
  nombreInput: string = "";
  claveInput: string = "";
  saveMyData: boolean = false;
  mostrarTexto: boolean = false;
  isLoading: boolean = false;

  //Intancia de servicios
  constructor(
    private _loginService: UsuarioService,
    private _widgetService: WidgetService,
    private _router: Router,
    private _dialog: MatDialog,
  ) {
  }

  //guardar Token y navegar a la pantalla Home
  ngOnInit(): void {

  }

  //Validar usuario y contraseña
  async login(): Promise<void> {

    if (!this.nombreInput || !this.claveInput) {
      this._widgetService.openSnackbar("Por favor completa todos los campos para continuar");
      return
    }


    let user: CredencialInterface = {
      user: this.nombreInput,
      password: this.claveInput,
    }

    this.isLoading = true;
    let res: ResApiInterface = await this._loginService.postLogin(user);
    this.isLoading = false;

    if (!res.success) {
      this._widgetService.openSnackbar("Algo salió mal, intentalo más tarde");
      return;
    }

    let response: ResApiInterface = res.data;

    if (!response.success) {
      this._widgetService.openSnackbar("Usuario o contraseña incorrectos");
      return;
    }

    let resUser: UserInterface = response.data;



    // sesion no permanente
    sessionStorage.setItem('user', resUser.usuario);
    sessionStorage.setItem('token', resUser.clave);
    sessionStorage.setItem('rol', resUser.rol_Id.toString());
    sessionStorage.setItem('id', resUser.id.toString());


    //TODO:Verificar guards, ya que no valida el estado del usario para permitir el acceso, tambien se deben verificar roles
    //Primer inicio o uno nuevo, si es primer inico olicitar cambio de contraseña
    if (!resUser.estado) {

      //Abrrir dialgo de activacion 
      const dialogRef = this._dialog.open(ActivateUserComponent);

      dialogRef.afterClosed().subscribe(async result => {
        if (result) {
          this._router.navigate(['/home']);
        }
      });


      return;
    }

    //Si el usuario esta correcto
    this._router.navigate(['/home']);

  }

  //Permanencia de la sesión
  rememberMe(): void {
    this.saveMyData ? this.saveMyData = false : this.saveMyData = true;
  }
}
