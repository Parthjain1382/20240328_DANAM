import { Component } from '@angular/core';
import { TableComponentComponent } from '../table-component/table-component.component';

@Component({
  selector: 'app-donor-profile-page',
  standalone: true,
  imports: [TableComponentComponent],
  templateUrl: './donor-profile-page.component.html',
  styleUrl: './donor-profile-page.component.css'
})
export class DonorProfilePageComponent {
  amount=500;
  causes=50;
}
