export interface CuentaInterface {
    id:             number;
    numero_cuenta:  string;
    saldo:          number;
    fecha_apertura: Date;
    cliente_id:     number;
    tipo_cuenta_id: number;
}
