import { ClienteInterface } from "./cliente.interface";
import { CuentaInterface } from "./cuenta.interface";
import { TarjetaInterface } from "./tarjeta.interface";
import { UserInterface } from "./user.interface";

export interface AccountReportInterface {

    user?: UserInterface,
    cliente?:ClienteInterface,
    cuenta?: CuentaInterface,
    tarjeta?: TarjetaInterface,
}