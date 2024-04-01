import { Component, Input } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import { CommonModule } from '@angular/common';

interface Cause {
  imageUrl: string;
  imageDescription: string;
  category: string;
  title: string;
  description: string;
  buttonLabel: string;
}

@Component({
  selector: 'app-cause-card',
  standalone: true,
  imports: [MatButtonModule,CommonModule],
  templateUrl: './cause-card.component.html',
  styleUrl: './cause-card.component.css'
})
export class CauseCardComponent {
  @Input() sampleCauses: Cause[] = [];
}
