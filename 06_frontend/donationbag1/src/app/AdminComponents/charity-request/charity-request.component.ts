import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-charity-request',
  standalone: true,
  imports: [],
  templateUrl: './charity-request.component.html',
  styleUrl: './charity-request.component.css'
})
export class CharityRequestComponent implements OnInit{
  charity_array: { orphanage_name: String, date: Date, category: String, amount: number, title: string }[] = [{
    orphanage_name: 'Pranay orphanage',
    date: new Date('2024-03-12'),
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
        // Now you can replace or concatenate the fetched data without type errors
        this.charity_array = data.map(item => ({
          orphanage_name: item.name, // Adjust according to actual property names in fetched data
          date: new Date(item.date),
          category: item.category,
          amount: item.amount,
          title: item.title
        }));
      },
      (error) => {
        console.error('Error fetching data:', error);
      }
    );
  }
}
