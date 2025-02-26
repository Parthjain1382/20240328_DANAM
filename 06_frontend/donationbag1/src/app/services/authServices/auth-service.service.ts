  import { Injectable } from '@angular/core';
  import { BehaviorSubject ,Observable} from 'rxjs';
  import { HttpClient } from '@angular/common/http';
  import { Router } from '@angular/router';
  import Swal from 'sweetalert2';
  import { environment } from '../../../environment';
  @Injectable({
    providedIn: 'root',
  })
  export class AuthServiceService {

    private isAuthenticated = new BehaviorSubject<boolean>(false);

    private isAuth: boolean = false;
    private token!: any;
    private expireTokenTime: any;
    private userid: any;
    private apiUrl = environment.apiUrl;
    // isOffline: boolean = !navigator.onLine;
    constructor(
      public http: HttpClient,
      public router: Router
    ) {}



  /**
     * Checks if the user is logged in by verifying the presence of a token.
     * Updates the isAuthenticated BehaviorSubject based on the token's presence.
     */
  isAuthTokenPresent(): boolean {
    const tokenPresent = !!(localStorage.getItem('userToken') || localStorage.getItem('orgToken'));
    this.isAuthenticated.next(tokenPresent);
    return tokenPresent;
  }

    /**
   * Retrieves the authentication status.
   * @returns Authentication status.
   */
    getIsAuth():boolean {
      return this.isAuth;
    }

  /**
     * Returns the role of the logged-in user or 'organization' as a default.
     */
  getUserRole(): string {
    return localStorage.getItem('role') || 'organization';
  }


    /** Logs out the user.
     */
    onLogout() {
      this.token = null;
      this.router.navigate(['/']);
      this.isAuth = false;
      // clearTimeout(this.expireTokenTime);
    localStorage.clear();
    }



    /** This is the function to Login for the Donor and Admin
     * @param email Taking the email for login
     * @param password Taking the password to match with the hashed password
     */
    loginDonor(email: string, password: string): void {
      const loginData = { email, password };

      if (email && password) {
        this.http.post(`${this.apiUrl}/login`, loginData).subscribe({
          next: (response: any) => {
            const token = response.token;
            const role = response.role;
            const donarId = response.donarId;

            if (token && role) {
              localStorage.setItem('userToken', token);
              localStorage.setItem('role', role);
              localStorage.setItem('donarId', donarId);

              this.isAuth=true
              this.isAuthenticated.next(true); // Update the authentication state
             this.showSuccessAlert("Signin Succesfull")
              // Navigate based on the role
              if (role === 'donar') {
                this.router.navigate(['/']);
              } else if (role === 'admin') {
                this.router.navigate(['/admin']);
              } else {
                this.router.navigate(['/']);
              }
            } else {
              console.log('No token received');
            }
          },
          error: (error) => {
            this.showErrorAlert(error.error.error)
          },
        });
      } else {
        console.log('Form is invalid. Please fix the errors.');
      }
    }


    /**This is the function For signUp for Donor
     * @param email
     * @param password
     * @param username
     * @param phoneNumber
     * @param address
     */
    storeUserCredDonor(email: string, password: string, username: string, phoneNumber: string, address: string) {
      const userData = {
        email: email,
        password: password,
        username: username,
        phone_number: phoneNumber,
        address: address,
      };

      this.http.post(`${this.apiUrl}/signup`, userData).subscribe({
        next: (response: any) => {
          console.log('User registered successfully');
          this.showSuccessAlert('User registered successfully');
          this.router.navigate(['/donorsignin']);
        },
        error: (error) => {
          console.error('Registration error:', error);
          if (error.error && error.error.error) {
            this.showErrorAlert(error.error.error);
          }
        },
      });
    }

    /**This is the function to Login for the Organization
     * @param email
     * @param password
     */
    loginOrganization(email: string, password: string): void {
      const loginData = { email, password };


      if (email && password) {
        this.http.post(`${this.apiUrl}/org/login`, loginData).subscribe({
          next: (response: any) => {
            console.log('Signin successful');
            const token = response.token;
            const orgId = response.orgId;

            if (token) {

              localStorage.setItem('orgToken', token);
              localStorage.setItem('orgId', orgId);


              this.isAuth=true
              this.showSuccessAlert('Signin successful');
              // Navigate to the home page if the token is present
              this.router.navigate(['/']);
            } else {
              // Optionally handle the case where there's no token in the response
              console.log('No token received');
            }
          },
          error: (error) => {
            this.showErrorAlert(error.error.error); // Display the error message in an alert
          },
        });
      } else {
        console.log('Form is invalid. Please fix the errors.');
      }
    }

    /**This is the function to Signup for the Organization
     * @param name
     * @param email
     * @param password
     * @param location
     * @param contactNumber
     */
    storeUserCredOraganization(name: string, email: string, password: string, location: string, contactNumber: string): void {
      const orgData = {
        name: name,
        email: email,
        password: password,
        location: location,
        contactNumber: contactNumber,
      };

      this.http.post(`${this.apiUrl}/org/signup`, orgData).subscribe({
        next: (response: any) => {
          console.log('Organization registered successfully');
          this.showSuccessAlert('Organization registered successfully');
          this.router.navigate(['/orgsignin']);
        },
        error: (error) => {
          console.error('Registration error:', error);
          if (error.error && error.error.error) {
            this.showErrorAlert(error.error.error);
          }
        },
      });
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

