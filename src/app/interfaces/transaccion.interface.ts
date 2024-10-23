export interface TransaccionInterface {
    id:                  number;
    cuenta_id:           number;
    tipo_transaccion_id: number;
    monto:               number;
    fecha:               Date;
    descripcion:         string;
    numero_autorizacion:         string;
    realizado_por:       number;
}
