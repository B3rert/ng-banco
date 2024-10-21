import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CuentaNumeroInterface } from 'src/app/interfaces/cuenta-numero.interface';

@Component({
  selector: 'app-info-account',
  templateUrl: './info-account.component.html',
  styleUrls: ['./info-account.component.scss']
})
export class InfoAccountComponent {
  constructor(
    public dialogRef: MatDialogRef<InfoAccountComponent>,
    @Inject(MAT_DIALOG_DATA) public data: CuentaNumeroInterface,
  ) {

  }
}
