import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SuccessTraInterface } from 'src/app/interfaces/success-tra.interface';

@Component({
  selector: 'app-succes-tra',
  templateUrl: './succes-tra.component.html',
  styleUrls: ['./succes-tra.component.scss']
})
export class SuccesTraComponent {
  constructor(
    public dialogRef: MatDialogRef<SuccesTraComponent>,
    @Inject(MAT_DIALOG_DATA) public data: SuccessTraInterface,
  ) {

  }

  downloadSucces(){
    //TODO:Hacer pdf
  }
}
