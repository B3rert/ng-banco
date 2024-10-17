import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiProvider } from '../providers/api.provider';
import { ResApiInterface } from '../interfaces/res-api.interface';
import { CredencialInterface } from '../interfaces/credencial.interface';
import { NewUserInterface } from '../interfaces/new-user.interface';

@Injectable()
export class UserService {
    private _urlBase: string = "";

    //inicializar http
    constructor(private _http: HttpClient) {
        //asignacion de urlBase
        this._urlBase = ApiProvider.baseUrl;
    }


    //funcion que va a realizar consumo privado
    postUser(user: NewUserInterface) {
        //configurar headers
        let paramsStr = JSON.stringify(user); //JSON to String
        let headers = new HttpHeaders({ "Content-Type": "application/json" });
        //consumo de api
        return this._http.post(`${this._urlBase}Usuario/crear`, paramsStr, { headers: headers,  observe: 'response' });
    }


    //funcion que va a realizar consumo privado
    private _postLogin(user: CredencialInterface) {
        //configurar headers
        let paramsStr = JSON.stringify(user); //JSON to String
        let headers = new HttpHeaders({ "Content-Type": "application/json" });
        //consumo de api
        return this._http.post(`${this._urlBase}Usuario/login`, paramsStr, { headers: headers });
    }

    //funcion asyncrona con promise

    postLogin(user: CredencialInterface): Promise<ResApiInterface> {
        //consumo primer servicio
        return new Promise((resolve, reject) => {
            this._postLogin(user).subscribe(
                res => {
                    let resApi: ResApiInterface = {
                        success: true,
                        data: res
                    }
                    resolve(resApi)
                },
                //si algo sale mal
                err => {
                    let resApi: ResApiInterface = {
                        success: false,
                        data: err
                    }
                    resolve(resApi);

                }
            );

        });
    }
}