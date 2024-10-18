import { Component } from '@angular/core';
import { TransaccionMesInterface } from 'src/app/interfaces/transaccion.interface';
import { WidgetService } from 'src/app/services/widget.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss'],
  providers:[
    WidgetService,
  ]
})
export class HistoryComponent {


  isLoading: boolean = false;
  transactions:TransaccionMesInterface[] = [];

  /**
   *
   */
  constructor(
    private _location:Location,
    private _widgetService:WidgetService,
  
  ) {
    
  }
  ngOnInit(): void {
  this.loadData();
  }

  async loadData(){

  }

  backPage(){
    this._location.back();
  }

}
