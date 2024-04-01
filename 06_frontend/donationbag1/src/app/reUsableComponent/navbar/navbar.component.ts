import { Component, OnInit } from '@angular/core';
import { NgClass } from '@angular/common';
import { AuthServiceService } from '../../services/authServices/auth-service.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AddNewOrphanageComponent } from '../../add-new-orphanage/add-new-orphanage.component';
@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [NgClass,CommonModule,AddNewOrphanageComponent],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit {
  navbarOpen = false;
  isSignedUp: boolean = false;

  toggleNavbar() {
    this.navbarOpen = !this.navbarOpen;
  }
  navToAdd(){
    this.router.navigate(['/addNewOrphanage'])
  }
  constructor(private authService: AuthServiceService,private router:Router) {


  }
  ngOnInit() {
    this.authService.loggedIn$.subscribe(loggedIn => {
      this.isSignedUp = loggedIn;
    });
  }

  Login():void{
    this.router.navigate(['/login'])
  }

  //login Method
  SignUp():void{
  this.router.navigate(['/signup'])
  }

   Logout(): void {

    const confirmation = confirm('Are you sure you want to log out?');

    // Check if the user confirmed the action
    if (confirmation) {
      this.isSignedUp = false;
      // clearing the token from the local Storage
      localStorage.removeItem('jwtToken');
      // For example, to redirect to a login page, you might use Angular's Router (assuming it's injected in your constructor)

      this.router.navigate(['/login']);
      // this.clearSessionTimer();
    }
  }
}
