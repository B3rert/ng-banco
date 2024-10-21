import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { CardDataInterface } from 'src/app/interfaces/card-data.interface';
import { ResApiInterface } from 'src/app/interfaces/res-api.interface';
import { TarjetaHidenInterface } from 'src/app/interfaces/tarjeta-hiden.interface';
import { ApiService } from 'src/app/services/api.service';
import { TarjetaService } from 'src/app/services/tarjeta.service';
import { WidgetService } from 'src/app/services/widget.service';
import { PasswordComponent } from '../password/password.component';
import { StatusCardInterface } from 'src/app/interfaces/status-card.interface';

@Component({
  selector: 'app-options-card',
  templateUrl: './options-card.component.html',
  styleUrls: ['./options-card.component.scss'],
  providers: [
    TarjetaService,
    WidgetService,
  ]
})
export class OptionsCardComponent implements OnInit {

  card?: CardDataInterface;
  show: boolean = false;
  active: boolean = false;
  isLoading: boolean = false;

  constructor(
    private _dialog: MatDialog,
    private _widgetService: WidgetService,
    private _tarjetaService: TarjetaService,
    private _router: Router,
    public dialogRef: MatDialogRef<OptionsCardComponent>,
    @Inject(MAT_DIALOG_DATA) public data: TarjetaHidenInterface,
  ) {

  }
  ngOnInit(): void {
    switch (this.data.estado_id) {
      case 1:
        this.active = true;

        break;
      case 2:
        this.active = false;
        break;

      default:
        this.active = false;

        break;
    }
  }



  async showCard() {
    if (this.show) {

      const dialogRef = this._dialog.open(PasswordComponent);

      dialogRef.afterClosed().subscribe(async result => {
        if (result) {
          this.isLoading = true;
          await this.getCard();
          this.isLoading = false;
        }else{
          this.show = !this.show;
        }
      });

    } else {
      this.card = undefined;
    }

  }


  activeCard() {
    if (this.active) {

      const dialogRef = this._dialog.open(PasswordComponent);

      dialogRef.afterClosed().subscribe(async result => {
        if (result) {
          this.isLoading = true;
          await this.putStatusCard(1);
          this.isLoading = false;
        }else{
          this.active  = !this.active;
        }
      });

    } else {
      const dialogRef = this._dialog.open(PasswordComponent);

      dialogRef.afterClosed().subscribe(async result => {
        if (result) {
          this.isLoading = true;
          await this.putStatusCard(2);
          this.isLoading = false;
        }else{
          this.active  = !this.active;

        }
      });

    }

  }


  navigateHistory() {
    this.dialogRef.close();
    this._router.navigate(['/transactions', this.data.cuenta_id]);
  }


  
  async putStatusCard(status:number): Promise<boolean> {

    const user = sessionStorage.getItem("user");

    let newStatus:StatusCardInterface= {
      estado: status,
      id: this.data.id,
    }

    const api = () => this._tarjetaService.postEstadoTarjeta(newStatus);

    const res: ResApiInterface = await ApiService.apiUse(api);

    if (!res.success) {
      this._widgetService.openSnackbar("Algo salió mal, intentalo mas tarde.");
      console.error(res);
      return false;
    }

    this.card = res.data;


    return true;
  }

  async getCard(): Promise<boolean> {

    const user = sessionStorage.getItem("user");
    const api = () => this._tarjetaService.getTarjetaId(this.data.id);

    const res: ResApiInterface = await ApiService.apiUse(api);

    if (!res.success) {
      this._widgetService.openSnackbar("Algo salió mal, intentalo mas tarde.");
      console.error(res);
      return false;
    }

    this.card = res.data;


    return true;
  }
}
