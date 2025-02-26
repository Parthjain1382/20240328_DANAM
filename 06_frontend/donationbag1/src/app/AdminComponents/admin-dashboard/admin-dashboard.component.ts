import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CharityRequestComponent } from '../charity-request/charity-request.component';
import { RouterOutlet } from '@angular/router';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Navigation } from '@angular/router';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.css'
})
export class AdminDashboardComponent {


    //Constructor
    constructor(private http: HttpClient, private router: Router) {
    }


  navtoDonorList(){
        this.router.navigate(['/donorList'])
}
navtoCharityRequest(){
  this.router.navigate(['/charityrequest'])
}
navtoDonation(){
  this.router.navigate(['/donation'])
}
navtoCharityList(){
  this.router.navigate(['/charityList'])
}

}
