import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiProvider } from '../providers/api.provider';

@Injectable()
export class RolService{
    private _urlBase: string = "";

    //inicializar http
    constructor(private _http: HttpClient) {
        //asignacion de urlBase
        this._urlBase = ApiProvider.baseUrl;
    }


    //funcion que va a realizar consumo privado
    getRol() {
        //consumo de api
        return this._http.get(`${this._urlBase}Rol`, { observe: 'response' });
    }
}