import { Component } from '@angular/core';
import { FormsModule,NgModel } from '@angular/forms';
import { NgStyle } from '@angular/common';

import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up-organization',
  standalone: true,
  imports: [NgStyle,FormsModule],
  templateUrl: './sign-up-organization.component.html',
  styleUrl: './sign-up-organization.component.css'
})
export class SignUpOrganizationComponent {
  usernameErrorVisibility:Boolean = false
  emailErrorVisibility:Boolean = false
  passwordErrorVisibility:Boolean = false
  companyName:string = ''
  email:string= ''
  contactNumber:string=''
  address:string= ''
  password:string=''
  usernameErrorMessage: string = '';
  emailErrorMessage: string = '';
  passwordErrorMessage: string = '';
  submitDisabled:Boolean = true


  ngOnInit(): void {

  }

  // validateUsername(): void {
  //   // Example validation: Username should not be empty
  //   if (this.username.trim().length === 0) {
  //     this.usernameErrorMessage = 'Username cannot be empty';
  //     this.usernameErrorVisibility = true;

  //   } else {
  //     this.usernameErrorVisibility = false;

  //   }
  // }

  validateEmail(): void {
    // Simple email regex for demonstration
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(this.email)) {
      this.emailErrorMessage = 'Invalid email format';
      this.emailErrorVisibility = true;

    } else {
      this.emailErrorVisibility = false;

    }
  }
  validatePassword(): void {
    if (this.password.length < 8) {
      this.passwordErrorMessage = 'Password must be greater than 8 characters';
      this.passwordErrorVisibility = true;

    } else if (!/[A-Z]/.test(this.password)) {
      this.passwordErrorMessage = 'Password must contain at least one capital letter';
      this.passwordErrorVisibility = true;

    } else {
      this.passwordErrorVisibility = false;

    }
    this.checkAllValidations();
  }
  hideUsernameError(){
    this.usernameErrorVisibility = false
  }
  hideEmailError(){
    this.emailErrorVisibility = false
  }
  hidePasswordError(){
    this.passwordErrorVisibility = false
  }

  checkAllValidations(): void {
    // Check if all validations pass
    // const isUsernameValid = !this.usernameErrorVisibility && this.username.trim().length > 0;
    const isEmailValid = !this.emailErrorVisibility && this.email.trim().length>0;
    const isPasswordValid = !this.passwordErrorVisibility && this.password.trim().length>0;

    // Update submitDisabled based on validations
    this.submitDisabled = !(isEmailValid && isPasswordValid);
  }

  //If already have a account then nav to Login
  navToLogin(){
    this.router.navigate(['/login'])
  }

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private router: Router // Inject Router here
  ) { }


  storeUserCred(): void {
    const orgData = {
      name: this.companyName,
      email: this.email,
      password: this.password,
      location: this.address,
      contactNumber: this.contactNumber
    };

    this.http.post('http://localhost:3000/org/signup', orgData).subscribe({
      next: (response: any) => {
        console.log('User registered successfully');
        this.router.navigate(['/orgsignin']);
      },
      error: (error) => {
        console.error('Registration error:', error);
      }
    });
  }

}
