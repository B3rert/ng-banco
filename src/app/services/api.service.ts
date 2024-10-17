import { Injectable } from '@angular/core';
import { ResApiInterface } from '../interfaces/res-api.interface';
import { firstValueFrom, Observable } from 'rxjs';


@Injectable({
    providedIn: 'root'
})
export class ApiService {


    // función asíncrona para uso de apis, manejo de errores
    static async apiUse(api: () => Observable<any>): Promise<ResApiInterface> {
        try {
            //Uso del api
            const res = await firstValueFrom(api());


            //Retronarn respuesta correcta
            return {
                data: res,
                success: true,
            };
        } catch (err: any) {
            return {
                data: err,
                success: false,
            };
            //Retonra el error con la interfaz requerida
        }
    }

}