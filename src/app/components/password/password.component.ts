import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-password',
  templateUrl: './password.component.html',
  styleUrls: ['./password.component.scss']
})
export class PasswordComponent {


  isLoading: boolean = false;

  /**
   *
   */
  constructor(
    public dialogRef: MatDialogRef<PasswordComponent>,

  ) {
    
  }
  
  password:string  = "";
  
  validPassword(){

  }

}
