import { Component } from '@angular/core';
import { FormsModule,NgModel } from '@angular/forms';
import { NgStyle } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { NgModule } from '@angular/core';

import Swal from 'sweetalert2'
import { AuthServiceService } from '../services/authServices/auth-service.service';
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
  phoneNumberErrorVisibility:Boolean=false

  companyName:string = ''
  email:string= ''
  phonenumber:string=''
  address:string= ''
  password:string=''

  phonenumberErrorMessage:string=''
  usernameErrorMessage: string = '';
  emailErrorMessage: string = '';
  passwordErrorMessage: string = '';
  submitDisabled:Boolean = true


  ngOnInit(): void {}

  /** validate Function for email to follow the regular Expression
   */
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

  /**This is function for validating the password
   */
  validatePassword(): void {
    //checking the length to be greater than 8
    if (this.password.length < 8) {
      this.passwordErrorMessage = 'Password must be greater than 8 characters';
      this.passwordErrorVisibility = true;

    }
    //one capital
    else if (!/[A-Z]/.test(this.password)) {
      this.passwordErrorMessage = 'Password must contain at least one capital letter';
      this.passwordErrorVisibility = true;

    } else {
      this.passwordErrorVisibility = false;

    }
    this.checkAllValidations();
  }

  /**
 * Validates the phone number format.
 * If the phone number does not match the specified pattern, an error message is displayed.
 * Otherwise, the error message is hidden.
 * Finally, the checkAllValidations() method is called.
*/
validatePhoneNumber(): void {
  const pattern = /^(0|91)?[6-9][0-9]{9}$/
  if (!pattern.test(this.phonenumber)) {
    this.phonenumberErrorMessage = 'Invalid phone number format';
    this.phoneNumberErrorVisibility = true;
  } else {
    this.phoneNumberErrorVisibility = false;
  }
  this.checkAllValidations();
}

/**
 * Hides the error message for the  email, password, contact number field.
 */
  hideUsernameError(){
    this.usernameErrorVisibility = false
  }
  hideEmailError(){
    this.emailErrorVisibility = false
  }
  hidePasswordError(){
    this.passwordErrorVisibility = false
  }
  hidePhoneError(){
    this.phoneNumberErrorVisibility= false
  }

/**
 * Checks all validations for the form.
 * If all validations pass, the submit button is enabled.
 * Otherwise, the submit button is disabled.
*/
  checkAllValidations(): void {
    // Check if all validations pass
    const isEmailValid = !this.emailErrorVisibility && this.email.trim().length>0;
    const isPasswordValid = !this.passwordErrorVisibility && this.password.trim().length>0;
    const isPhoneNumberValid = !this.phoneNumberErrorVisibility && this.phonenumber.trim().length > 0;

    // Update submitDisabled based on validations
    this.submitDisabled = !(isEmailValid && isPasswordValid && isPhoneNumberValid);
  }


  //If already have a account then nav to Login
  navToLogin(){
    this.router.navigate(['/orgsignin'])
  }

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private router: Router,
    private authService:AuthServiceService
  ) { }


  //function for Signup of organization
  storeUserCred(): void {
    this.authService.storeUserCredOraganization(this.companyName, this.email, this.password, this.address, this.phonenumber);
  }

}
