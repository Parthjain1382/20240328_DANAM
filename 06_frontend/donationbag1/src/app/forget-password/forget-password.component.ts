import { Component } from '@angular/core';
import { NgStyle } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forget-password',
  standalone: true,
  imports: [FormsModule,NgStyle],
  templateUrl: './forget-password.component.html',
  styleUrl: './forget-password.component.css'
})
export class ForgetPasswordComponent {
  email: string = '';
  password: string = '';

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private router: Router
  ) {}

  /** visibility of email
   */
  emailErrorVisible: boolean = false;
  /**visibility of password
   */
  /**submit buttom visibility
   */
  submitDisabled: boolean = true;
  /**email error message
   */
  emailError: { errorMsg: string }[] = [{ errorMsg: '' }];
  /**password error message
   */

  /** To validate email field
   *
   * @param {String} email input email
   * @returns {String|undefined} error string or undefined
   */
  validateEmail(email: string): string | undefined {
    if (!email) {
      return 'Email is required';
    }

    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
      return 'Email is not in a valid format';
    }

    if (email.length > 255) {
      return 'Email is too long';
    }

    return undefined;
  }
  /** To validate password field
   *
   * @param {String} email input password
   * @returns {String|undefined} error string or undefined
   */

  /** To handel onblue event and show error if required on email
   *
   * @param {event}
   */
  handleEmailBlur(event: any) {
    //take email value
    const email = event.target.value;
    // check for validation
    const error = this.validateEmail(email);
    this.emailError = error ? [{ errorMsg: error }] : [];
    // if error then make error visible
    if (this.emailError.length > 0) {
      this.emailErrorVisible = true;
    }
  }
  /** make errormessage disabled on focus
   *
   */
  onEmailFocus() {
    this.emailErrorVisible = false;
  }


  /**make errormessage disabled on focus
   *
   *
   */


  handelOnchange(event: any) {}
  handelOnmouseenter() {}
  /**to handel submit button visibility and make error msg disabled
   *
   * @param {event }
   */

  ngOnInit(): void {}

  forgetPassword(): void {

    this.http.post('http://localhost:3000/forgot_password', { email: this.email })
    .subscribe(
      (response) => {
        // Handle the response from the backend
        console.log(this.email);
        window.alert("Password reset link sent to Email Successfully!!");
        console.log('Response:', response);
      },
      (error) => {
        // Handle any errors that occur during the request
        console.error('Error:', error);
      }
    );
  }
}
