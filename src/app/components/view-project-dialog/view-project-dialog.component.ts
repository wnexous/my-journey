import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-view-project-dialog',
  templateUrl: './view-project-dialog.component.html',
  styleUrls: ['./view-project-dialog.component.scss']
})
export class ViewProjectDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<ViewProjectDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}
}
