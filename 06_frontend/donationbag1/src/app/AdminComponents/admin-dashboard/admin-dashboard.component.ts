import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CharityRequestComponent } from '../charity-request/charity-request.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.css'
})
export class AdminDashboardComponent {

}
