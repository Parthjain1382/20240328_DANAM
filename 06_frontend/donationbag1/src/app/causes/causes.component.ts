import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { environment } from '../../environment';

@Component({
  selector: 'app-causes',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './causes.component.html',
  styleUrl: './causes.component.css',
})
export class CausesComponent implements OnInit {
  filteredCauses: any[] = [];
  selectedCategories: string[] = [];
  causes: any[] = [];
  token: any;
  private apiurl = environment.apiUrl
  constructor(private http: HttpClient, private router: Router) {}

  takeToCauseDetailPage(causeId: string): void {
    this.router.navigate(['/causeDetail'], {
      queryParams: { _id: causeId },
    });
  }
  ngOnInit(): void {
    this.getAllCauses(); // Fetch only published pages
  }

  getAllCauses(): void {
    const url = `${this.apiurl}/donor/causes`;
    this.http.get<any[]>(url).subscribe({
      next: (response) => {
        //getting all cause whose status is "pending"
        const pendingCauses = response.filter(response  => response.status === 'accepted');
        this.causes = pendingCauses;

      // Assuming this.causes is an array of objects where each object has a descriptionText property
      for (let i = 0; i < this.causes.length; i++) {
      if (this.causes[i].descriptionText && this.causes[i].descriptionText.length > 32) {
      this.causes[i].descriptionText = this.causes[i].descriptionText.slice(0, 32)+'...';

      //Rounding off the required and raised Funds
      this.causes[i].fundsRaised=Math.floor(response[i].fundsRaised)
      this.causes[i].fundsRequired =Math.floor(response[i].fundsRequired)
      }
      }

        this.applyFilter();
      },
      error: (error) => {
        console.error('Error fetching causes:', error);
        // Handle error gracefully, show a message to the user, or retry the request
      },
    });
  }

  applyFilter(): void {
    if (this.selectedCategories.length === 0) {
      // If no categories selected, display all causes
      this.filteredCauses = this.causes;
    } else {
      // Filter causes based on selected categories
      this.filteredCauses = this.causes.filter((cause) =>
        this.selectedCategories.includes(cause.category)
      );
    }
  }

  onCheckboxChange(category: string): void {
    if (this.selectedCategories.includes(category)) {
      // If category already selected, remove it
      this.selectedCategories = this.selectedCategories.filter(
        (item) => item !== category
      );
    } else {
      // If category not selected, add it
      this.selectedCategories.push(category);
    }
    this.applyFilter(); // Apply filter when categories change
  }
}
