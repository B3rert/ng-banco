import { CuentaNumeroInterface } from "./cuenta-numero.interface"
import { CuentaUserInterface } from "./cuenta-user.interface"

export interface SuccessTraInterface{
    monto:number,
    fecha:Date,
    autorizacion: string
    cuentaOrigen?: CuentaNumeroInterface,
    cuentaDestino?: CuentaNumeroInterface,
    cuenta?: CuentaNumeroInterface,
    tipoTra?:string;
    comentario:string,
}