import { Component } from '@angular/core';
import { aboutUsComponent } from '../reUsableComponent/aboutUs/aboutUs.component';
import { VisionMissionComponent } from '../reUsableComponent/vision-mission/vision-mission.component';

@Component({
  selector: 'app-aboutservices',
  standalone: true,
  imports: [aboutUsComponent,VisionMissionComponent],
  templateUrl: './aboutservices.component.html',
  styleUrl: './aboutservices.component.css'
})
export class AboutservicesComponent {

}
