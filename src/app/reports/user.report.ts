import { Injectable } from '@angular/core';
import { UserInterface } from '../interfaces/user.interface';
import { TDocumentDefinitions } from 'pdfmake/interfaces';

@Injectable()
export class UserReportService {


    async getReport(datos: UserInterface) {


        var docDefinition: TDocumentDefinitions = {
            pageSize: 'LETTER',
            info: {
                title: 'Resporte de usuario',
                author: 'Banco del Monte S.A.',
            },
            pageMargins: [25, 100, 25, 60],
            content: [
                { text: 'Nuevo usuario', style: 'header' },

                { text: 'Usuario', style: 'subheader' },
                {
                    table: {
                        widths: ['auto', '*'],
                        body: [
                            ['Usuario', datos.usuario],
                            ['Contraseña Temporal', datos.clave],
                            ['Estado', 'Inactivo']
                        ]
                    },
                    margin: [0, 10, 0, 20]
                }

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