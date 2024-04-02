import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AfterViewChecked, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-charity-info',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './charity-info.component.html',
  styleUrl: './charity-info.component.css',
})
export class CharityInfoComponent implements OnInit {
  causeId: any;
  token: any;
  content: any;

  constructor(private http: HttpClient, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.token = localStorage.getItem('userToken');

    this.route.queryParams.subscribe((params) => {
      this.causeId = params['_id'];
      if (this.causeId) {
        this.fetchCauseContent(); // Fetch page content if page ID is available
      } else {
        console.error('Cause ID not found');
      }
    });
  }

  fetchCauseContent(): void {
    const url = `http://localhost:3000/donor/getCause?_id=${this.causeId}`;

    // HTTP GET request to fetch page content
    this.http.get<any>(url).subscribe({
      next: (response) => {
        this.content = response;
        console.log(response);
      },
      error: (error) => {
        console.error('Error:', error);
      },
    });
  }
}
