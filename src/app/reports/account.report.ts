import { Injectable } from '@angular/core';
import { TDocumentDefinitions } from 'pdfmake/interfaces';
import { AccountReportInterface } from '../interfaces/account-report.interface';

@Injectable()
export class AccountReportService {


    async getReport(datos: AccountReportInterface) {

        let dateOpen: Date = new Date(datos.cuenta!.fecha_apertura);
        let strDate = `${dateOpen.getDate()}/${dateOpen.getMonth() + 1}/${dateOpen.getFullYear()}`;

        let fechVenCard: Date = new Date(datos.tarjeta!.fecha_vencimiento);
        let strDateCard = `${fechVenCard.getMonth() + 1}/${fechVenCard.getFullYear()}`;

        let tipoCuenta: string = "";
        let tipoTarjeta: string = "";

        //TODO:EL sp deberia devolver la descripcion del tipo de cuenta
        switch (datos.cuenta!.tipo_cuenta_id) {
            case 1:
                tipoCuenta = "Cuenta de Ahorro"
                break;
            case 2:
                tipoCuenta = "Cuenta Monetaria"
                tipoTarjeta = "Tarjeta de Debito"
                break;
            case 3:
                tipoCuenta = "Tarjeta de Credito"
                tipoTarjeta = "Tarjeta de Credito"
                break;
            default:
                break;
        }

        var docDefinition: TDocumentDefinitions = {
            pageSize: 'LETTER',
            info: {
                title: 'Apertura de cuenta',
                author: 'Banco del Monte S.A.',
            },
            pageMargins: [25, 100, 25, 60],
            content: [
                { text: 'Apertura de Cuenta', style: 'header' },
                { text: `Fecha de Apertura: ${strDate}`, margin: [0, 10, 0, 20] },

                datos.user ?
                    [
                        { text: 'Usuario', style: 'subheader' },
                        {
                            table: {
                                widths: ['auto', '*'],
                                body: [
                                    ['Usuario', datos.user.usuario],
                                    ['Contraseña Temporal', datos.user.clave],
                                    ['Estado', 'Inactivo']
                                ]
                            },
                            margin: [0, 10, 0, 20]
                        }
                    ] : [],

                { text: 'Cuenta', style: 'subheader' },
                {
                    table: {
                        widths: ['auto', '*'],
                        body: [
                            ['Número de Cuenta', datos.cuenta!.numero_cuenta],
                            ['Tipo de Cuenta', tipoCuenta],
                            ['Titular de la Cuenta', `${datos.cliente!.nombre} ${datos.cliente!.apellido}`],
                            ['Saldo', 'GTQ 00.00'],
                        ]
                    },
                    margin: [0, 10, 0, 20]
                },

                datos.tarjeta?
                [
                    { text: 'Tarjeta', style: 'subheader' },
                    {
                        table: {
                            widths: ['auto', '*'],
                            body: [
                                ['Tipo de Tarjeta', tipoTarjeta],
                                ['Estado', 'Inactivo'],
                                ['Número de Tarjeta', datos.tarjeta.numero_tarjeta],
                                ['Fecha de Vencimiento', strDateCard],
                                ['CVV', datos.tarjeta.cvv]
                            ]
                        },
                        margin: [0, 10, 0, 20]
                    }
                ]:[]
            ],
            styles: {
                header: {
                    fontSize: 18,
                    bold: true
                },
                subheader: {
                    fontSize: 14,
                    bold: true,
                    margin: [0, 10, 0, 5]
                }
            }
        }


        return docDefinition;

    }

}