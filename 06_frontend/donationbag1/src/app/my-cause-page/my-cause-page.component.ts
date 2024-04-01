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
    },
    {
      imageUrl: 'https://via.placeholder.com/150',
      imageDescription: 'Animal Rescue Efforts',
      category: 'Animal Welfare',
      title: 'Help Abandoned Animals Find Loving Homes',
      description: 'Contribute to rescue missions, shelter care, and adoption initiatives.',
      buttonLabel: 'Sponsor a Pet'
    },
    {
      imageUrl: 'https://via.placeholder.com/150',
      imageDescription: 'Supporting Veterans and Active Military',
      category: 'Veterans & Military',
      title: 'Honor Our Heroes by Supporting Veterans and Active Military',
      description: 'Provide resources, advocacy, and support programs for veterans and active military personnel.',
      buttonLabel: 'Show Your Appreciation'
    },
    {
      imageUrl: 'https://via.placeholder.com/150',
      imageDescription: 'Helping Hands for Homeless Shelters',
      category: 'Homelessness',
      title: 'Support Our Winter Shelter Drive',
      description: 'Help provide warmth and essential supplies to those in need this winter.',
      buttonLabel: 'Donate Now'
    },
    {
      imageUrl: 'https://via.placeholder.com/150',
      imageDescription: 'Animal Rescue Efforts',
      category: 'Animal Welfare',
      title: 'Help Abandoned Animals Find Loving Homes',
      description: 'Contribute to rescue missions, shelter care, and adoption initiatives.',
      buttonLabel: 'Sponsor a Pet'
    },
    {
      imageUrl: 'https://via.placeholder.com/150',
      imageDescription: 'Supporting Veterans and Active Military',
      category: 'Veterans & Military',
      title: 'Honor Our Heroes by Supporting Veterans and Active Military',
      description: 'Provide resources, advocacy, and support programs for veterans and active military personnel.',
      buttonLabel: 'Show Your Appreciation'
    },
  ]
}
