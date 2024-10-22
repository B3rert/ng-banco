import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { CredencialInterface } from 'src/app/interfaces/credencial.interface';
import { PutPasswordInterface } from 'src/app/interfaces/put-password.interface';
import { ResApiInterface } from 'src/app/interfaces/res-api.interface';
import { ApiService } from 'src/app/services/api.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { WidgetService } from 'src/app/services/widget.service';

@Component({
  selector: 'app-activate-user',
  templateUrl: './activate-user.component.html',
  styleUrls: ['./activate-user.component.scss'],
  providers: [
    UsuarioService,
    WidgetService,
  ]
})
export class ActivateUserComponent {

  password: string = "";
  confirmPassword: string = "";

  isLoading: boolean = false;

  /**
   *
   */
  constructor(
    public dialogRef: MatDialogRef<ActivateUserComponent>,
    private _widgetService: WidgetService,
    private _loginService: UsuarioService,
  ) {

  }



  //Validar usuario y contraseña
  async validPassword(): Promise<void> {

    if (!this.password || !this.confirmPassword) {
      this._widgetService.openSnackbar("Por favor completa todos los campos para continuar.");
      return
    }

    if (this.password != this.confirmPassword) {
      this._widgetService.openSnackbar("Las contraseñas no coinciden");

      return;
    }

    let idUser:number = Number(sessionStorage.getItem("id"));
   
    let passwordObj:PutPasswordInterface = {
      password: this.password, 
      id:  idUser,
    };

    let api = ()=> this._loginService.postNewPassword(passwordObj);

    this.isLoading = true;
    let res:ResApiInterface = await ApiService.apiUse(api);
    this.isLoading = false;
    
    if (!res.success) {
      this._widgetService.openSnackbar("Algo salió mal, intentalo más tarde");
      return;
    }

    this.dialogRef.close(true);
  }

}
