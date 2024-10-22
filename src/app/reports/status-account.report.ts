import { Injectable } from '@angular/core';
import { TransaccionMesInterface } from '../interfaces/transaccion-mes.interface';
import { CuentaNumeroInterface } from '../interfaces/cuenta-numero.interface';

@Injectable()
export class StatusAccountReportService {
    getReport(cuenta: CuentaNumeroInterface, transacciones: TransaccionMesInterface[]) {
        const movimientos = transacciones.map(transaccion => [
            { text: new Date(transaccion.fecha).toLocaleDateString(), alignment: 'center' },
            { text: transaccion.tipo_transaccion, alignment: 'center' },
            { text: transaccion.es_credito ? 'Crédito' : 'Débito', alignment: 'center' },
            { text: transaccion.monto.toFixed(2), alignment: 'center' }
        ]);

        // Calcular totales de créditos, débitos y saldo actual
        const totalCreditos = transacciones
            .filter(t => t.es_credito)
            .reduce((total, t) => total + t.monto, 0);

        const totalDebitos = transacciones
            .filter(t => !t.es_credito)
            .reduce((total, t) => total + t.monto, 0);

        const saldoActual = totalCreditos - totalDebitos;

        const documentDefinition: any = {
            content: [
                { text: 'Estado de Cuenta', style: 'header' },
                { text: `Fecha de Generación: ${new Date().toLocaleDateString()}`, margin: [0, 10, 0, 20] },

                // Información de la cuenta
                { text: `Nombre Completo: ${cuenta.nombre_completo}`, margin: [0, 10, 0, 10] },
                { text: `Número de Cuenta: ${cuenta.numero_cuenta}`, margin: [0, 0, 0, 5] },
                { text: `Tipo de Cuenta: ${cuenta.tipo_cuenta}`, margin: [0, 0, 0, 5] },

                // Totales
                { text: `Total Créditos: GTQ ${totalCreditos.toFixed(2)}`, margin: [0, 20, 0, 5] },
                { text: `Total Débitos: GTQ ${totalDebitos.toFixed(2)}`, margin: [0, 0, 0, 5] },
                { text: `Saldo Actual: GTQ ${saldoActual.toFixed(2)}`, margin: [0, 0, 0, 20] },

                // Tabla de movimientos
                {
                    table: {
                        headerRows: 1,
                        widths: ['*', '*', '*', '*'],
                        body: [
                            [
                                { text: 'Fecha', style: 'tableHeader', alignment: 'center' },
                                { text: 'Tipo de Transacción', style: 'tableHeader', alignment: 'center' },
                                { text: 'Crédito/Débito', style: 'tableHeader', alignment: 'center' },
                                { text: 'Monto (GTQ)', style: 'tableHeader', alignment: 'center' }
                            ],
                            ...movimientos
                        ]
                    }
                }
            ],
            styles: {
                header: {
                    fontSize: 18,
                    bold: true,
                    margin: [0, 0, 0, 10]
                },
                tableHeader: {
                    bold: true,
                    fontSize: 13,
                    color: 'black'
                }
            }
        };

        return documentDefinition;
    }
}