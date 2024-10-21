import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { DialogActionsComponent } from '../dialog-actions/dialog-actions.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  isLoading: boolean = false;

  /**
   *
   */
  constructor(
    private _router: Router,
    private _dialog: MatDialog

  ) {

  }

  logout(){
    const dialogRef = this._dialog.open(DialogActionsComponent, {
      width: '500px',
    });

    dialogRef.afterClosed().subscribe( async result => {

      if(result){
        sessionStorage.clear();
        localStorage.clear();
        this._router.navigate(["/login"]);
      }
    });
  }

  navigateNewUser(){
    this._router.navigate(['/new-user']);
  }
  navigateNewAccount() {
    this._router.navigate(['/new-account']);

  }

  navigateAccounts(){
    this._router.navigate(['/accounts']);

  }

  navigateCards(){
    this._router.navigate(['/cards']);
  }

  navigateTransfer(){
    this._router.navigate(['/transfer']);

  }

  navigateServices(){
    this._router.navigate(['/services']);
  }

  navigateStatus(){
    this._router.navigate(['/status']);
  }
}
