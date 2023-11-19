import { Component, OnInit, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { ViewProjectDialogComponent } from '../view-project-dialog/view-project-dialog.component';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-project-card',
  templateUrl: './project-card.component.html',
  styleUrls: ['./project-card.component.scss'],
  standalone: true,
  imports: [MatCardModule, MatButtonModule, MatIconModule, NgIf],
})
export class ProjectCardComponent {
  constructor(
    public dialog: MatDialog
    ) {}

  @Input() projectData: any; 

  openViewProjectDialog() {
    this.dialog.open(ViewProjectDialogComponent, {
      width: '700px',
      data: {
        title: this.projectData.title,
        description: this.projectData.description,
        image: this.projectData.image
      },
    });
  }

}
