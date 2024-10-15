import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ResApiInterface } from 'src/app/interfaces/res-api.interface';
import { CredencialInterface } from 'src/app/interfaces/credencial.interface';
import { LoginService } from 'src/app/services/login.service';
import { WidgetService } from 'src/app/services/widget.service';
import { UserInterface } from 'src/app/interfaces/user.interface';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [
    LoginService,
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
    private _loginService: LoginService,
    private _widgetService: WidgetService,
    private _router: Router,
  ) {
  }

  //guardar Token y navegar a la pantalla Home
  ngOnInit(): void {
   
  }


  navRegister() {
    this._router.navigate(['/register']);
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

    let response:ResApiInterface = res.data;


    let resUser: UserInterface = response.data;

    // sesion no permanente
    sessionStorage.setItem('user', resUser.usuario);
    sessionStorage.setItem('token', resUser.clave);

    //Si el usuario esta correcto
    //  this._router.navigate(['/home']);

    console.log(resUser);
    
  }

  //Permanencia de la sesión
  rememberMe(): void {
    this.saveMyData ? this.saveMyData = false : this.saveMyData = true;
  }
}
