import { Component } from '@angular/core';
import { TarjetaHidenInterface } from 'src/app/interfaces/tarjeta-hiden.interface';
import { Location } from '@angular/common';
import { TarjetaService } from 'src/app/services/tarjeta.service';
import { WidgetService } from 'src/app/services/widget.service';
import { Router } from '@angular/router';
import { ResApiInterface } from 'src/app/interfaces/res-api.interface';
import { ApiService } from 'src/app/services/api.service';

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
    await this.getAccounts();
    this.isLoading = false;
  }

  navigateHistory(idCuenta:number) {
    this._router.navigate(['/transactions', idCuenta]);
  }

  changeStatusCard(){
    console.log("Cambiar");
    
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
