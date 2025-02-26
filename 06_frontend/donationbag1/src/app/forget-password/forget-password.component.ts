import { Component } from '@angular/core';
import { NgStyle } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { environment } from '../../environment';
@Component({
  selector: 'app-forget-password',
  standalone: true,
  imports: [FormsModule,NgStyle],
  templateUrl: './forget-password.component.html',
  styleUrl: './forget-password.component.css'
})
export class ForgetPasswordComponent {
  apiurl = environment.apiUrl
  email: string = '';
  emailErrorMessage: string = '';
  emailIsValid: boolean = false; // New variable to track email validity
  submitDisabled: boolean = true;
  emailErrorVisibility:Boolean = false

  ngOnInit(): void {
  }

  validateEmail(): void {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(this.email)) {
      this.emailErrorMessage = 'Invalid email format';
      this.emailErrorVisibility = true;
      this.emailIsValid = false; // Email is not valid
    } else {
      this.emailErrorVisibility = false;
      this.emailIsValid = true; // Email is valid
    }
    this.checkAllValidations(); // Ensure this is called here to update the submit button state
  }

  checkAllValidations(): void {
    this.submitDisabled = !this.emailIsValid; // Submit button is enabled only if the email is valid
  }

/**
 * Hides the error message for the email field.
 */
  hideEmailError(){
    this.emailErrorVisibility = false
  }

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private router: Router,
  ) { }



  forgetPassword(): void {

    this.http.post(`${this.apiurl}/forgot_password`, { email: this.email })
    .subscribe(
      (response) => {
        // Handle the response from the backend
        console.log(this.email);
        this.showSuccessAlert('Successfully Send Forgot Link');
        this.router.navigate(['']);
      },
      (error) => {
        // Handle any errors that occur during the request
        this.showErrorAlert(error.error.error);
      }
    );
  }


    /**popup Message for error
     * @param errorMessage
     */
    showErrorAlert(errorMessage: string) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: errorMessage,
      });
    }

    /**Sucess Message Popup
     * @param message
     */
    showSuccessAlert(message: string) {
      Swal.fire({
        icon: 'success',
        title: 'Success',
        text: message,
      });
    }


}
