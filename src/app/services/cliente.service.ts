import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiProvider } from '../providers/api.provider';
import { ClienteInterface } from '../interfaces/cliente.interface';

@Injectable()
export class ClienteService {

    private _urlBase: string = "";

    //inicializar http
    constructor(private _http: HttpClient) {
        //asignacion de urlBase
        this._urlBase = ApiProvider.baseUrl;
    }

    //funcion que va a realizar consumo privado
    postCliente(user: ClienteInterface) {
        //configurar headers
        let paramsStr = JSON.stringify(user); //JSON to String
        let headers = new HttpHeaders({ "Content-Type": "application/json" });
        //consumo de api
        return this._http.post(`${this._urlBase}Cliente`, paramsStr, { headers: headers, observe: 'response' });
    }



    getTipoCuentaDpi(cui: string) {
        //consumo de api
        return this._http.get(`${this._urlBase}Cliente/${cui}`, { observe: 'response' });
    }
}