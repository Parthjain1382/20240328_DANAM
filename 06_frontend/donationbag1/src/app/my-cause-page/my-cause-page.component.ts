import { Component } from '@angular/core';
import { CauseCardComponent } from '../cause-card/cause-card.component';
interface Cause {
  imageUrl: string;
  imageDescription: string;
  category: string;
  title: string;
  description: string;
  buttonLabel: string;
}
@Component({
  selector: 'app-my-cause-page',
  standalone: true,
  imports: [CauseCardComponent],
  templateUrl: './my-cause-page.component.html',
  styleUrl: './my-cause-page.component.css'
})
export class MyCausePageComponent {
  sampleCauses:Cause[]=[
    {
      imageUrl: 'https://via.placeholder.com/150',
      imageDescription: 'Helping Hands for Homeless Shelters',
      category: 'Homelessness',
      title: 'Support Our Winter Shelter Drive',
      description: 'Help provide warmth and essential supplies to those in need this winter.',
      buttonLabel: 'Donate Now'
    }
  ]
}
