import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiProvider } from '../providers/api.provider';
import { NewAccountInterface } from '../interfaces/new-account.interface';

@Injectable()
export class CuentaService {
    private _urlBase: string = "";

    //inicializar http
    constructor(private _http: HttpClient) {
        //asignacion de urlBase
        this._urlBase = ApiProvider.baseUrl;
    }

    //funcion que va a realizar consumo privado
    postCuenta(ceunta: NewAccountInterface) {
        //configurar headers
        let paramsStr = JSON.stringify(ceunta); //JSON to String
        let headers = new HttpHeaders({ "Content-Type": "application/json" });
        //consumo de api
        return this._http.post(`${this._urlBase}Cuenta`, paramsStr, { headers: headers, observe: 'response' });
    }



    //funcion que va a realizar consumo privado
    getTipoCuenta() {
        //consumo de api
        return this._http.get(`${this._urlBase}Cuenta/tipo`, { observe: 'response' });
    }
    //funcion que va a realizar consumo privado

}