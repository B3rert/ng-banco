import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiProvider } from '../providers/api.provider';
import { ResApiInterface } from '../interfaces/res-api.interface';
import { CredencialInterface } from '../interfaces/credencial.interface';

@Injectable()
export class LoginService{
    private _urlBase: string = "";

    //inicializar http
    constructor(private _http: HttpClient) {
        //asignacion de urlBase
        this._urlBase = ApiProvider.baseUrl;
    }


    //funcion que va a realizar consumo privado
     postLogin(user: CredencialInterface) {
        //configurar headers
        let paramsStr = JSON.stringify(user); //JSON to String
        let headers = new HttpHeaders({ "Content-Type": "application/json" });
        //consumo de api
        return this._http.post(`${this._urlBase}Usuario/login`, paramsStr, { headers: headers });
    }

    
}