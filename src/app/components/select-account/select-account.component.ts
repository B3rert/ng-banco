import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CuentaNumeroInterface } from 'src/app/interfaces/cuenta-numero.interface';

@Component({
  selector: 'app-select-account',
  templateUrl: './select-account.component.html',
  styleUrls: ['./select-account.component.scss']
})
export class SelectAccountComponent {
  constructor(
    public dialogRef: MatDialogRef<SelectAccountComponent>,
    @Inject(MAT_DIALOG_DATA) public data: CuentaNumeroInterface[],
  ) {

  }
}
