import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor( private _router: Router) {}

  canActivate(): boolean {
    //permite ver una ruta solo si existe un token en la sesion
    if (sessionStorage.getItem("user")) {
      return true;
    } else {
      //Si no hay in token dirige al login
      this._router.navigate(['/login']); 
      return false;
    }
  }
}
