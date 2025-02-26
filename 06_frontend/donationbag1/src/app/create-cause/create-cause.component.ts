import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormControl, Validators, FormGroup } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { CreateCauseServiceService } from '../services/createCauseService/create-cause-service.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { environment } from '../../environment';

@Component({
  selector: 'app-create-cause',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    HttpClientModule
  ],
  templateUrl: './create-cause.component.html',
  styleUrls: ['./create-cause.component.css']
})
export class CreateCauseComponent {
  causeForm = new FormGroup({
    causeName: new FormControl('', Validators.required),
    fundsRequired: new FormControl('', [Validators.required, Validators.pattern(/^[0-9]+(\\.[0-9]{1,2})?$/)]),
    category: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    imageUrl: new FormControl('', Validators.required)
  });
  apiUrl = environment.apiUrl;


  categories = ['Health', 'Education', 'Environment', 'Social', 'Other'];

  constructor(private createCauseService: CreateCauseServiceService,
    private router: Router,
    private http: HttpClient) { }


    UploadResponse:any

  cloudImage: string = ''

  fileChangeEvent(fileInput: any) {
    // Correctly accessing the first file using `files[0]`
    const file = fileInput.target.files[0];

    // Preparing FormData with the correct file object
    const formData = new FormData();
    formData.append('image', file, file.name); // Ensure you pass 'file' not 'fileInput'

    // Adjusted the URL to include '/org' based on your example
    this.http.post(`${this.apiUrl}/org/upload`, formData)
      .subscribe({
        next: (response) => {
          this.UploadResponse=response
          this.showSuccessAlert("Image Added Successfully");
        },
        error: (error) => {
          // Use if-else to handle different error statuses
          if (error.status === 404) {
            this.showErrorAlert('Server not found.');
          } else if (error.status === 500) {
            this.showErrorAlert('Internal server error.');
          } else {
            this.showErrorAlert('An unknown error occurred.');
          }
        }
      });
  }

  onSubmit() {
    if (this.causeForm.valid) {
      const causeData = {
        name: this.causeForm.value.causeName,
        fundsRequired: this.causeForm.value.fundsRequired,
        category: this.causeForm.value.category,
        descriptionText: this.causeForm.value.description,
        descriptionImage: this.UploadResponse.imageurl,
      };
      this.createCauseService.createCause(causeData).subscribe(
        (response) => {
          this.showSuccessAlert("Cause created successfully")
          this.router.navigate(['/'])
        },
        (error) => {
          console.error('Error creating cause:', error);
          this.showErrorAlert(error.error.error)
          // Add any additional logic for error handling
        }
      );
    }
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
