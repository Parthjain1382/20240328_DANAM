import { Component } from '@angular/core';
import { NgStyle } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { environment } from '../../environment';

@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [NgStyle,FormsModule],
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.css'
})
export class ResetPasswordComponent {
  passwordInputFocused: boolean = false;
  password: string = '';
  token: string | null = '';
  apiUrl = environment.apiUrl
  constructor(
    private http: HttpClient, private route: ActivatedRoute,private router: Router
  ) {this.token = this.route.snapshot.queryParamMap.get('token');}


  /**visibility of password
   */
  passwordErrorVisible: boolean = false;
  /**submit buttom visibility
   */
  submitDisabled: boolean = true;

  /**password error message
   */
  passwordError: { errorMsg: string }[] = [{ errorMsg: '' }];


  /** To validate password field
   *
   * @param {String} email input password
   * @returns {String|undefined} error string or undefined
   */
  validatePassword(password: string): string | undefined {
    // Check if the password is at least 8 characters long
    if (password.length < 8) {
      return 'Password must be at least 8 characters long';
    }

    // Check if the password contains at least one lowercase letter
    if (!/[a-z]/.test(password)) {
      return 'Password must contain at least one lowercase letter';
    }

    // Check if the password contains at least one uppercase letter
    if (!/[A-Z]/.test(password)) {
      return 'Password must contain at least one uppercase letter';
    }

    // Check if the password contains at least one digit
    if (!/\d/.test(password)) {
      return 'Password must contain at least one digit';
    }

    // Check if the password contains at least one special character
    if (!/[@$!%*#?&]/.test(password)) {
      return 'Password must contain at least one special character';
    }

    // Password is valid
    return undefined;
  }



  /**To handel onblue event and show error if required on password
   *
   * @param {event}
   */
  handlePasswordBlur(event: any) {
    const password = event.target.value;
    const error = this.validatePassword(password);
    this.passwordError = error ? [{ errorMsg: error }] : [];
    if (this.passwordError.length > 0) {
      this.passwordErrorVisible = true;
    }
  }

  /**make errormessage disabled on focus
   *
   *
   */
  onPasswordFocus() {
    this.passwordErrorVisible = false;
  }

  handelOnchange(event: any) {}
  handelOnmouseenter() {}
  /**to handel submit button visibility and make error msg disabled
   *
   * @param {event }
   */
  handelPasswordChange(event: any) {
    this.passwordErrorVisible = false;
    const password = event.target.value;

    const error = this.validatePassword(password);

    if (typeof error == 'undefined') {
      // if (this.emailErrorVisible == false) {
      //   this.submitDisabled = false;
      // }
    }
  }

  ngOnInit(): void {}

  resetPassword(): void {
    // Ensure the token is present
    if (!this.token) {
      console.error('Token is missing');
      return;
    }

    // Construct the URL with the dynamic token
    const url = `${this.apiUrl}/resetpassword?token=${this.token}`;

    this.http.post(url, { password: this.password })
      .subscribe(
        (response) => {
          // Handle the response from the backend
          console.log('Response:', response);

          window.alert("Password Reset Sucessfully!");
          this.router.navigate(['']);
        },
        (error) => {
          // Handle any errors that occur during the request
          console.error('Error:', error);
        }
      );
  }
}
