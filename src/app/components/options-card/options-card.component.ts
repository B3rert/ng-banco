import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TarjetaHidenInterface } from 'src/app/interfaces/tarjeta-hiden.interface';

@Component({
  selector: 'app-options-card',
  templateUrl: './options-card.component.html',
  styleUrls: ['./options-card.component.scss']
})
export class OptionsCardComponent {


  constructor(
    public dialogRef: MatDialogRef<OptionsCardComponent>,
    @Inject(MAT_DIALOG_DATA) public data: TarjetaHidenInterface,
  ) {

  }

}
