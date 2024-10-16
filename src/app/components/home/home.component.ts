import { Component } from '@angular/core';
import { Router } from '@angular/router';

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
  constructor(private _router: Router) {

  }

  navigateNewAccount() {
    this._router.navigate(['/new-account']);

  }

}
