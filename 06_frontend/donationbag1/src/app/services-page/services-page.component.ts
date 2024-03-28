import { Component } from '@angular/core';
import { ServicesComponent } from '../reUsableComponent/services/services.component';

@Component({
  selector: 'app-services-page',
  standalone: true,
  imports: [ServicesComponent],
  templateUrl: './services-page.component.html',
  styleUrl: './services-page.component.css'
})
export class ServicesPageComponent {

}
