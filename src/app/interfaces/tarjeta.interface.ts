export interface TarjetaInterface {
    id:                number;
    cuenta_id:         number;
    tipo_tarjeta_id:   number;
    numero_tarjeta:    string;
    fecha_emision:     Date;
    fecha_vencimiento: Date;
    cvv:               number;
    estado_id:         number;
}
