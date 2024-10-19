import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { CredencialInterface } from 'src/app/interfaces/credencial.interface';
import { ResApiInterface } from 'src/app/interfaces/res-api.interface';
import { UserInterface } from 'src/app/interfaces/user.interface';
import { UsuarioService } from 'src/app/services/usuario.service';
import { WidgetService } from 'src/app/services/widget.service';

@Component({
  selector: 'app-password',
  templateUrl: './password.component.html',
  styleUrls: ['./password.component.scss'],
  providers:[
    WidgetService,
    UsuarioService,
  ]
})
export class PasswordComponent {


  isLoading: boolean = false;

  /**
   *
   */
  constructor(
    public dialogRef: MatDialogRef<PasswordComponent>,
    private _widgetService:WidgetService,
    private _loginService:UsuarioService,
  ) {

  }

  password: string = "";

  //Validar usuario y contraseña
  async validPassword(): Promise<void> {

    if (!this.password) {
      this._widgetService.openSnackbar("Por favor completa todos los campos para continuar.");
      return
    }

    const userLocal = sessionStorage.getItem("user");


    let user: CredencialInterface = {
      user: userLocal!,
      password: this.password,
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

    this.dialogRef.close(true);
  }


}
