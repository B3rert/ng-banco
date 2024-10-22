import { Injectable } from '@angular/core';
import { SuccessTraInterface } from '../interfaces/success-tra.interface';
import { TDocumentDefinitions } from 'pdfmake/interfaces';

@Injectable()
export class TransactionReportService {


    async getReport(data: SuccessTraInterface) {

        var docDefinition: TDocumentDefinitions = {
            pageSize: 'LETTER',
            info: {
                title: 'MOVIMIENTO',
                author: 'Banco del Monte S.A.',
            },
            pageMargins: [25, 100, 25, 60],
            content: [
                { text: 'Reporte de Movimiento', style: 'header' },
                { text: `Fecha: ${new Date(data.fecha).toLocaleString()}`, margin: [0, 10, 0, 20] },

                // Si no existe cuenta
                !data.cuenta ?
                    [
                        { text: 'Autorización', style: 'subheader' },
                        { text: data.id },

                        { text: 'Cuenta Origen', style: 'subheader' },
                        { text: data.cuentaOrigen!.nombre_completo },
                        { text: `Tipo de Cuenta: ${data.cuentaOrigen!.tipo_cuenta}` },
                        { text: `Número de Cuenta: ${data.cuentaOrigen!.numero_cuenta}` },

                        { text: 'Cuenta Destino', style: 'subheader' },
                        { text: data.cuentaDestino!.nombre_completo },
                        { text: `Tipo de Cuenta: ${data.cuentaDestino!.tipo_cuenta}` },
                        { text: `Número de Cuenta: ${data.cuentaDestino!.numero_cuenta}` },

                        { text: 'Monto', style: 'subheader' },
                        { text: `${data.monto} GTQ`, margin: [0, 10, 0, 20] },

                        { text: 'Comentario', style: 'subheader' },
                        { text: data.comentario || 'Sin comentario' }
                    ] :
                    [
                        { text: 'Movimiento', style: 'subheader' },
                        { text: data.tipoTra! },

                        { text: 'Autorización', style: 'subheader' },
                        { text: data.id },

                        { text: 'Cuenta', style: 'subheader' },
                        { text: data.cuenta!.nombre_completo },
                        { text: `Tipo de Cuenta: ${data.cuenta!.tipo_cuenta}` },
                        { text: `Número de Cuenta: ${data.cuenta!.numero_cuenta}` },

                        { text: 'Monto', style: 'subheader' },
                        { text: `${data.monto} GTQ`, margin: [0, 10, 0, 20] },

                        { text: 'Comentario', style: 'subheader' },
                        { text: data.comentario || 'Sin comentario' }
                    ]
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
        };


        return docDefinition;

    }
}