import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-transfer',
  templateUrl: './transfer.component.html',
  styleUrls: ['./transfer.component.scss']
})
export class TransferComponent implements OnInit {
  isLoading: boolean = false;

  typeTra: any;

  typesTra: any[] = [
    {
      id: 1,
      name: 'Transferencia local',
    },
    {
      id: 2,
      name: 'Transferencia a terceros',
    },
    {
      id: 3,
      name: 'Transferencia a otro bancos',
    }
  ];



  constructor(private _location: Location) {
  }

  ngOnInit(): void {

    this.typeTra = this.typesTra[0];

  }

  backPage() {
    this._location.back();
  }


}
