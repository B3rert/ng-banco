import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FilterMonthInterface } from 'src/app/interfaces/filter-month.interface';

@Component({
  selector: 'app-months-filter',
  templateUrl: './months-filter.component.html',
  styleUrls: ['./months-filter.component.scss']
})
export class MonthsFilterComponent implements OnInit {

  /**
   *
   */
  constructor(
    public dialogRef: MatDialogRef<MonthsFilterComponent>,
    @Inject(MAT_DIALOG_DATA) public data: FilterMonthInterface,
  ) {

  }

  mesesAnteriores: FilterMonthInterface[] = [];
  mes?:FilterMonthInterface;

  ngOnInit(): void {

 

    let currentDate: Date = new Date();

    this.generarMesesAnteriores(currentDate.getMonth() + 1, currentDate.getFullYear());

    for (let i = 0; i < this.mesesAnteriores.length; i++) {
      const element = this.mesesAnteriores[i];
      
      if (element.month === this.data.month) {
        this.mes = element;
        break;
      }
    }
  }

  generarMesesAnteriores(mes: number, año: number) {
    for (let i = 0; i < 6; i++) {
      const fecha = new Date(año, mes - i - 1); // Restamos 1 porque los meses empiezan en 0 en JavaScript
      const nombreMes = fecha.toLocaleString('es-ES', { month: 'long' }); // Obtener nombre del mes en español
      const añoMes = fecha.getFullYear();

      this.mesesAnteriores.push(
        { 
          monthName: nombreMes,
          month: fecha.getMonth(), 
          year: añoMes 
        }
        );
    }
  }

}
