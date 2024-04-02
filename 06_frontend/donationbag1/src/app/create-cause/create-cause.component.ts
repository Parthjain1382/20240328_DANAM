// create-cause.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormControl, Validators, FormGroup } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-create-cause',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule
  ],
  templateUrl: './create-cause.component.html',
  styleUrls: ['./create-cause.component.css']
})
export class CreateCauseComponent {
  causeForm = new FormGroup({
    causeName: new FormControl('', Validators.required),
    fundsRequired: new FormControl('', [Validators.required, Validators.pattern(/^[0-9]+(\.[0-9]{1,2})?$/)]),
    category: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    imageUrl: new FormControl('', Validators.required)
  });

  categories = ['Health', 'Education', 'Environment', 'Social', 'Other'];

  onSubmit() {
    if (this.causeForm.valid) {
      console.log('Form submitted:', this.causeForm.value);
      // Add your logic to handle form submission here
    }
  }
}