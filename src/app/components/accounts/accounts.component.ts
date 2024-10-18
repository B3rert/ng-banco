import { Component } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.scss']
})
export class AccountsComponent {
  isLoading: boolean = false;


  /**
   *
   */
  constructor(private _location:Location) {
    
  }

  backPage(){
    this._location.back();
  }

}
