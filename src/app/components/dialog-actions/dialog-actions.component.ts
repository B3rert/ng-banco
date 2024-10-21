import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-actions',
  templateUrl: './dialog-actions.component.html',
  styleUrls: ['./dialog-actions.component.scss']
})
export class DialogActionsComponent {
  constructor(
    public dialogRef: MatDialogRef<DialogActionsComponent>,
  ) {

  }
}
