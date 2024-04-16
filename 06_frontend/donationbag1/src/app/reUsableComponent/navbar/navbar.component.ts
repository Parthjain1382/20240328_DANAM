import { Component, OnInit } from '@angular/core';
import { NgClass } from '@angular/common';
import { AuthServiceService } from '../../services/authServices/auth-service.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { DropdownComponent } from '../dropdown/dropdown.component';


import Swal from 'sweetalert2';
@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [NgClass, CommonModule, DropdownComponent],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent implements OnInit {
  navbarOpen = false;
  navbarOpen1 = false;
  jwt:string|null=localStorage.getItem('userTokesn')

  isSignedUp: boolean = false;
  userRole: any;

  isLoggedIn: boolean = false;


  toggleNavbar() {
    this.navbarOpen = !this.navbarOpen;
  }


  //Navigation Links
  navToProfile() {
    this.router.navigate(['/profile']);
  }
  navToAddCause(){
    this.router.navigate(['/createcause']);
  }
  navToAdmin(){
    this.router.navigate(['/admin']);
  }
  takeToCausespage() {
    this.router.navigate(['/causes']);
  }

  constructor(
    private authservice: AuthServiceService,
    private router: Router
  ) {
    this.isAuthTokenPresent();
  }

    isAuthTokenPresent():boolean{
      // this.userRole = localStorage.getItem('role') || 'organization';
      // return !!(localStorage.getItem('userToken') ||localStorage.getItem('orgToken'))
      this.isLoggedIn = this.authservice.isAuthTokenPresent();
      this.userRole = this.authservice.getUserRole();
      return this.isLoggedIn
   }

  ngOnInit() {
  }

  Login(): void {
    this.router.navigate(['/donorsignin']);
  }

  //login Method
  DonorSignUp(): void {
    this.router.navigate(['/donorsignup']);
  }

  OrgSignUp(): void {
    this.router.navigate(['/orgsignup']);
  }

  /**Logout Function
   *@returns void It returns Nothing
   */
  Logout(): void {
    //if the user confirms to logout
    Swal.fire({
      title: "Do you want to LogOut",
      showDenyButton: true,
      confirmButtonText: "Yes",
      denyButtonText: "No"
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        Swal.fire("Logged Out!", "", "success");

        // clearing the token from the local Storage
        this.authservice.onLogout();
        // localStorage.clear();

     }
    });

  }
  refreshPage() {
    window.location.reload();
  }
}
