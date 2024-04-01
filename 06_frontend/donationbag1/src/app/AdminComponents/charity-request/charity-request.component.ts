import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { formatDate } from '@angular/common';
@Component({
  selector: 'app-charity-request',
  standalone: true,
  imports: [],
  templateUrl: './charity-request.component.html',
  styleUrl: './charity-request.component.css'
})
export class CharityRequestComponent implements OnInit{
  charity_array: { orphanage_name: String, date: string, category: String, amount: number, title: string }[] = [{
    orphanage_name: 'Pranay orphanage',
    date: '2024-03-12',
    category: 'health',
    amount: 5000,
    title: "title",
  }];

  constructor(private http: HttpClient) {
  }

  ngOnInit(): void {
    this.fetchData();
  }

    fetchData() {
      const apiUrl = 'http://localhost:3000/admin/requests?status=pending';
      this.http.get<any[]>(apiUrl).subscribe(
        (data) => {
          // Transform the fetched data
          this.charity_array = data.map(item => ({
            orphanage_name: item.organization ? item.organization.name : 'Unknown', // Adjust according to actual property names in fetched data
            date: this.formatDate(new Date(item.date)), // Use this.formatDate to call the method correctly
            category: item.category,
            amount: item.fundsRequired, // Use fundsRequired property
            title: item.title
          }));
        },
        (error) => {
          console.error('Error fetching data:', error);
        }
      );
    }

    formatDate(date: Date): string {
      // Ensure the input is a Date object
      const dateObj = new Date(date);

      // Get the month as a string
      const month = dateObj.toLocaleString('en-US', { month: 'short' }); // 'Jan', 'Feb', etc.

      // Get the day of the month
      const day = dateObj.getDate();

      // Get the year
      const year = dateObj.getFullYear();

      // Combine them into the desired format without the day of the week
      return `${month} ${day.toString().padStart(2, '0')} ${year}`;
    }
  }
