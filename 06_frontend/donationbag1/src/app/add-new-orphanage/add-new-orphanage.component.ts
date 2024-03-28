import { Component } from '@angular/core';
import { NgModel } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { NgStyle } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
@Component({
  selector: 'app-add-new-orphanage',
  standalone: true,
  imports: [NgStyle, FormsModule],
  templateUrl: './add-new-orphanage.component.html',
  styleUrl: './add-new-orphanage.component.css'
})
export class AddNewOrphanageComponent {
  orphanageName: string = ''
  email: string = ''
  orph_desc: string = ''
  address: string = ''
  contactNo: number = 0
  imageUrl: string = ''
  beds: number = 0
  maleClothes: number = 0
  femaleClothes: number = 0


  emailErrorVisible: boolean = false;

  emailError: { errorMsg: string }[] = [{ errorMsg: "" }];

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
      this.emailErrorVisible = true
    }
  }

  /** make errormessage disabled on focus
   *
   */
  onEmailFocus() {
    this.emailErrorVisible = false
  }

  handelOnchange(event: any) { }

  constructor(private http: HttpClient, private router: Router) { }

  postOrphanage() {

    const token = localStorage.getItem('jwtToken');
    if (token) {
      const tokenPayload = JSON.parse(atob(token.split('.')[1]));
      console.log(tokenPayload);

      const userRole = tokenPayload.role; // Assuming role is stored in 'role' claim
      console.log(userRole);

      // Check if the user is an admin
      if (userRole === 'admin') {
        const orphanageData = {
          orphanageName: this.orphanageName,
          email: this.email,
          orph_desc: this.orph_desc,
          address: this.address,
          contactNo: this.contactNo,
          imageUrl: this.imageUrl,
          needs: {
            beds: this.beds,
            clothes:{
              mens:this.maleClothes,
              female:this.femaleClothes
               }
          },
        };

        console.log(orphanageData);

        this.http.post('http://localhost:3000/orphanage/addNewOrphanage', orphanageData).subscribe(
          response => {
            // Handle success response
            console.log('Orphanage posted successfully:', response);
            // Reset form fields
            this.resetForm();
            // Navigate to a success page or do any other necessary actions
            alert("success")
          },
          error => {
            // Handle error response
            console.error('Error posting orphanage:', error);
          }
        );
      } else {
        console.log('User is not authorized to post orphanages.');
        // Redirect to unauthorized page or display an error message
      }
    } else {
      console.log('User is not logged in.');
      // Redirect to login page or display an error message
    }
  }

  resetForm(): void {
    // Reset all form fields to their initial state
    this.orphanageName = '';
    this.email = '';
    this.orph_desc = '';
    this.address = '';
    this.contactNo = 0;
    this.imageUrl = '';
    this.beds = 0;
    this.maleClothes = 0;
    this.femaleClothes = 0;
  }
}
