import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NewAccountInterface } from '../interfaces/new-account.interface';
import { ApiProvider } from '../providers/api.provider';
import { NewCardInterface } from '../interfaces/new-card.interface';

@Injectable()
export class TarjetaService{
  
    private _urlBase: string = "";

    //inicializar http
    constructor(private _http: HttpClient) {
        //asignacion de urlBase
        this._urlBase = ApiProvider.baseUrl;
    }

    //funcion que va a realizar consumo privado
    postTarjeta(tarjeta: NewCardInterface) {
        //configurar headers
        let paramsStr = JSON.stringify(tarjeta); //JSON to String
        let headers = new HttpHeaders({ "Content-Type": "application/json" });
        //consumo de api
        return this._http.post(`${this._urlBase}Tarjeta`, paramsStr, { headers: headers, observe: 'response' });
    }

    getTarjetaUser(user:string) {
        //consumo de api
        return this._http.get(`${this._urlBase}Tarjeta/usuario/${user}`, { observe: 'response' });
    }

}