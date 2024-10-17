import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiProvider } from '../providers/api.provider';

@Injectable()
export class CuentaService{
    private _urlBase: string = "";

    //inicializar http
    constructor(private _http: HttpClient) {
        //asignacion de urlBase
        this._urlBase = ApiProvider.baseUrl;
    }

    //funcion que va a realizar consumo privado
    getTipoCuenta() {
        //consumo de api
        return this._http.get(`${this._urlBase}Cuenta/tipo`);
    }
}