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

            //Resultado del api
            const response: ResApiInterface = res.body as ResApiInterface;

            //Retronarn respuesta correcta
            return {
                data: response.data,
                success: true,
            };
        } catch (err: any) {
            //Si existen errores
            let resApi: ResApiInterface= {
                success: false,
                data: err?.error?.data || err.message || 'Unknown error',
            };

            //Retonra el error con la interfaz requerida
            return resApi;
        }
    }

}