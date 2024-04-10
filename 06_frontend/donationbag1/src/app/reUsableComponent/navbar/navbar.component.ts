import { Component, OnInit } from '@angular/core';
import { NgClass } from '@angular/common';
import { AuthServiceService } from '../../services/authServices/auth-service.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AddNewOrphanageComponent } from '../../add-new-orphanage/add-new-orphanage.component';
import { DropdownComponent } from '../dropdown/dropdown.component';
@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [NgClass, CommonModule, AddNewOrphanageComponent, DropdownComponent],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent implements OnInit {
  navbarOpen = false;
  jwt:string|null=localStorage.getItem('userTokesn')

  isSignedUp: boolean = false;
  userRole: any;
  toggleNavbar() {
    this.navbarOpen = !this.navbarOpen;
  }
  navToProfile() {
    this.router.navigate(['/profile']);
  }
  navToAddCause(){
    this.router.navigate(['/createcause']);
  }
  takeToCausespage() {
    this.router.navigate(['/causes']);
  }
  constructor(
    private authService: AuthServiceService,
    private router: Router
  ) {
    this.isAuthTokenPresent();
  }

  isAuthTokenPresent(){
    this.userRole = localStorage.getItem('role') || 'organization';


    return !!localStorage.getItem('userToken')
  }


  ngOnInit() {
  }

  Login(): void {
    this.router.navigate(['/login']);
  }

  //login Method
  DonorSignUp(): void {
    this.router.navigate(['/donorsignup']);
  }

  OrgSignUp(): void {
    this.router.navigate(['/orgsignup']);
  }

  Logout(): void {
    const confirmation = confirm('Are you sure you want to log out?');

    // Check if the user confirmed the action
    if (confirmation) {
      this.isSignedUp = false;
      // clearing the token from the local Storage
      localStorage.clear();   
      this.refreshPage()
      // For example, to redirect to a login page, you might use Angular's Router (assuming it's injected in your constructor)

      this.router.navigate(['/login']);
      // this.clearSessionTimer();
    }
  }
  refreshPage() {
    window.location.reload();
  }
}
