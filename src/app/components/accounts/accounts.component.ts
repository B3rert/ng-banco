import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { CuentaUserInterface } from 'src/app/interfaces/cuenta-user.interface';
import { CuentaService } from 'src/app/services/cuenta.service';
import { ResApiInterface } from 'src/app/interfaces/res-api.interface';
import { ApiService } from 'src/app/services/api.service';
import { WidgetService } from 'src/app/services/widget.service';

@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.scss'],
  providers:[
    CuentaService,
    WidgetService,
  ]
})
export class AccountsComponent implements OnInit{
  isLoading: boolean = false;
  accounts:CuentaUserInterface[] = [];

  /**
   *
   */
  constructor(
    private _location:Location,
    private _cuentaService:CuentaService,
    private _widgetService:WidgetService,
  
  ) {
    
  }
  ngOnInit(): void {
  this.loadData();
  }

  backPage(){
    this._location.back();
  }

  async loadData(){
    this.isLoading = true;
    await this.getAccounts();
    this.isLoading = false;
  }



  async getAccounts(): Promise<boolean> {

    const user = sessionStorage.getItem("user");
    const api = () => this._cuentaService.getCuentaUser(user!);

    const res: ResApiInterface = await ApiService.apiUse(api);

    if (!res.success) {
      this._widgetService.openSnackbar("Algo salió mal, intentalo mas tarde.");
      console.error(res);
      return false;
    }

    this.accounts = res.data;

    console.log(user);
    

    return true;
  }
}
