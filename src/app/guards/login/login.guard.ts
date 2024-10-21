import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {
  constructor( private _router: Router) {}

  canActivate(): boolean {
    //Deja ver una pantalla solo si no hay un token en la sesion
    if (!sessionStorage.getItem("user")) {
      return true;
    } else {
      //si hay un token navega al home
      this._router.navigate(["/home"]); 
      return false;
    }
  }
  
  
}
