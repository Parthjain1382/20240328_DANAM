import { Component } from '@angular/core';
import { aboutUsComponent } from '../reUsableComponent/aboutUs/aboutUs.component';
import { VisionMissionComponent } from '../reUsableComponent/vision-mission/vision-mission.component';
import { ServicesComponent } from '../reUsableComponent/services/services.component';
import { CarasolComponent } from '../reUsableComponent/carasol/carasol.component';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [CarasolComponent,aboutUsComponent,VisionMissionComponent,ServicesComponent,],
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.css'
})
export class LandingComponent {

}
