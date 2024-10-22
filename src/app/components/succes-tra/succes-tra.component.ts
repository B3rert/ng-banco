import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SuccessTraInterface } from 'src/app/interfaces/success-tra.interface';
import * as pdfMake from "pdfmake/build/pdfmake";
import * as pdfFonts from "pdfmake/build/vfs_fonts";
import { TransactionReportService } from 'src/app/reports/transaction.report';


@Component({
  selector: 'app-succes-tra',
  templateUrl: './succes-tra.component.html',
  styleUrls: ['./succes-tra.component.scss'],
  providers: [TransactionReportService]
})
export class SuccesTraComponent {
  constructor(
    private _reportService:TransactionReportService,
    public dialogRef: MatDialogRef<SuccesTraComponent>,
    @Inject(MAT_DIALOG_DATA) public data: SuccessTraInterface,
  ) {

  }

async   downloadSucces(){
    const docDefinition = await this._reportService.getReport(this.data);
    pdfMake.createPdf(docDefinition, undefined, undefined, pdfFonts.pdfMake.vfs).open();

  }
}
