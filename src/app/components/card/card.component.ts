import { Component } from '@angular/core';
import { TarjetaHidenInterface } from 'src/app/interfaces/tarjeta-hiden.interface';
import { Location } from '@angular/common';
import { TarjetaService } from 'src/app/services/tarjeta.service';
import { WidgetService } from 'src/app/services/widget.service';
import { Router } from '@angular/router';
import { ResApiInterface } from 'src/app/interfaces/res-api.interface';
import { ApiService } from 'src/app/services/api.service';
import { MatDialog } from '@angular/material/dialog';
import { OptionsCardComponent } from '../options-card/options-card.component';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
  providers:[
    TarjetaService,
    WidgetService,
    
  ]
})
export class CardComponent {
  isLoading: boolean = false;
  cards: TarjetaHidenInterface[] = [];

  /**
   *
   */
  constructor(
    private _location: Location,
    private _tarjetaService: TarjetaService,
    private _widgetService: WidgetService,
    private _router:Router,
    private _dialog: MatDialog

  ) {

  }
  ngOnInit(): void {
    this.loadData();
  }

  backPage() {
    this._location.back();
  }

  async loadData() {
    this.isLoading = true;
    //TODO:verificar contraseña
    await this.getAccounts();
    this.isLoading = false;
  }




  
  opneCard(card:TarjetaHidenInterface) {


    this._dialog.open(OptionsCardComponent, {
      data: card,
    });

   
  }

  async getAccounts(): Promise<boolean> {

    const user = sessionStorage.getItem("user");
    const api = () => this._tarjetaService.getTarjetaUser(user!);

    const res: ResApiInterface = await ApiService.apiUse(api);

    if (!res.success) {
      this._widgetService.openSnackbar("Algo salió mal, intentalo mas tarde.");
      console.error(res);
      return false;
    }

    this.cards = res.data;

    console.log(user);


    return true;
  }
}
