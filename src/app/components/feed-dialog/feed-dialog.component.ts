import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { NgIf } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Validators, FormsModule, ReactiveFormsModule, FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-feed-dialog',
  templateUrl: './feed-dialog.component.html',
  styleUrls: ['./feed-dialog.component.scss'],
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, NgIf, MatDialogModule, MatInputModule, MatFormFieldModule]
})
export class FeedDialogComponent {
  feedForm: FormGroup;

  constructor(    
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<FeedDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.feedForm = this.formBuilder.group({
      description: ['', Validators.required],
    });
  }
}
