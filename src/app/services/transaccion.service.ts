import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiProvider } from '../providers/api.provider';
import { NewTraInterface } from '../interfaces/new-tra.interface';

@Injectable()
export class TransaccionService {

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
                "idCuenta": idCuenta,
                "month": month,
                "year": year
            }
        );

        //consumo de api
        return this._http.get(`${this._urlBase}Transaccion`, { headers: headers, observe: 'response' });
    }

    //funcion que va a realizar consumo privado
    getTransaccionRango(
        idCuenta: number,
        incio: Date,
        fin: Date,
    ) {

        let headers = new HttpHeaders(
            {
                "idCuenta": idCuenta,
                "inicio": incio.toISOString(),
                "fin": fin.toISOString(),
            }
        );

        //consumo de api
        return this._http.get(`${this._urlBase}Transaccion/rango`, { headers: headers, observe: 'response' });
    }

    //funcion que va a realizar consumo privado
    postTra(tra: NewTraInterface) {
        //configurar headers
        let paramsStr = JSON.stringify(tra); //JSON to String
        let headers = new HttpHeaders({ "Content-Type": "application/json" });
        //consumo de api
        return this._http.post(`${this._urlBase}Transaccion`, paramsStr, { headers: headers, observe: 'response' });
    }


    getTipoTransaccion(
    ) {
        //consumo de api
        return this._http.get(`${this._urlBase}Transaccion/Tipo`, { observe: 'response' });
    }


}