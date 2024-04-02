import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormControl, Validators, FormGroup } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { CreateCauseServiceService } from '../services/createCauseService/create-cause-service.service';
import { HttpClientModule } from '@angular/common/http';

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

  categories = ['Health', 'Education', 'Environment', 'Social', 'Other'];

  constructor(private createCauseService: CreateCauseServiceService) { }

  onSubmit() {
    if (this.causeForm.valid) {
      const causeData = {
        name:this.causeForm.value.causeName,
        fundsRequired:this.causeForm.value.fundsRequired,
        category:this.causeForm.value.category,
        descriptionText:this.causeForm.value.description,
        descriptionImage:this.causeForm.value.imageUrl,
      };
      this.createCauseService.createCause(causeData).subscribe(
        (response) => {
          console.log('Cause created successfully:', response);
          // Add any additional logic for success handling
        },
        (error) => {
          console.error('Error creating cause:', error);
          // Add any additional logic for error handling
        }
      );
    }
  }
}