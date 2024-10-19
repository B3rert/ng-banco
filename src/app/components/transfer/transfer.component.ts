import { Component } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-transfer',
  templateUrl: './transfer.component.html',
  styleUrls: ['./transfer.component.scss']
})
export class TransferComponent {
  isLoading: boolean = false;


  /**
   *
   */
  constructor(private _location:Location) {
    
  }

  backPage() {
    this._location.back();
  }

  
}
