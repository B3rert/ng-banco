import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiProvider } from '../providers/api.provider';

@Injectable()
export class TransaccionService{
  
    private _urlBase: string = "";

    //inicializar http
    constructor(private _http: HttpClient) {
        //asignacion de urlBase
        this._urlBase = ApiProvider.baseUrl;
    }


    //funcion que va a realizar consumo privado
    getTransaccionMes(
        idCuenta: number,
        month: number,
        year: number,
    ) {

        let headers = new HttpHeaders(
            { 
                "idCuenta":idCuenta,
                "month":month,
                "year":year
        }
    );

        //consumo de api
        return this._http.get(`${this._urlBase}Transaccion`, { headers:headers, observe: 'response' });
    }
}