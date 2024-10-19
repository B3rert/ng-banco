import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { CardDataInterface } from 'src/app/interfaces/card-data.interface';
import { ResApiInterface } from 'src/app/interfaces/res-api.interface';
import { TarjetaHidenInterface } from 'src/app/interfaces/tarjeta-hiden.interface';
import { ApiService } from 'src/app/services/api.service';
import { TarjetaService } from 'src/app/services/tarjeta.service';
import { WidgetService } from 'src/app/services/widget.service';

@Component({
  selector: 'app-options-card',
  templateUrl: './options-card.component.html',
  styleUrls: ['./options-card.component.scss'],
  providers:[
    TarjetaService,
    WidgetService,
  ]
})
export class OptionsCardComponent {


  constructor(
    private _widgetService:WidgetService,
    private _tarjetaService:TarjetaService,
    private _router:Router,
    public dialogRef: MatDialogRef<OptionsCardComponent>,
    @Inject(MAT_DIALOG_DATA) public data: TarjetaHidenInterface,
  ) {

  }

  card?:CardDataInterface;
  show:boolean = false;
  active:boolean = false;
  isLoading: boolean = true;

  async showCard(){
    if(this.show){
      this.isLoading = true;
      await this.getCard();
      this.isLoading = false;
    }else{
      this.card = undefined;
    }
    
  }

  
  activeCard(){
    console.log(this.active);
    
  }


  navigateHistory() {
    this._router.navigate(['/transactions', this.data.cuenta_id]);
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
