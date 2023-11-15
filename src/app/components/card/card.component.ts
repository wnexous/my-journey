import { Component, OnInit, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import {NgIf} from '@angular/common';

import { Router } from '@angular/router';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
  standalone: true,
  imports: [MatCardModule, MatButtonModule, MatIconModule, NgIf],
})
export class CardComponent {

  constructor(
    private router:Router
    ) {}

  @Input() projectData: any; 

  editProject() {

    const { image, _id } = this.projectData;
    window.localStorage.setItem('image', image)
    window.localStorage.setItem('projectId', _id)

    delete this.projectData.image

    this.router.navigate(['/create-project', 
    { 
      project: JSON.stringify(this.projectData) 
    }]);
  }

}
