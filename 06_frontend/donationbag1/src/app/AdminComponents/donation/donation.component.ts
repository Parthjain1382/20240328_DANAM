import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-donation',
  standalone: true,
  imports: [],
  templateUrl: './donation.component.html',
  styleUrl: './donation.component.css'
})
export class DonationComponent implements OnInit {

  //donor_array storing all the data in
  donation_array: { _id: string, organization: string, donor: string, amount: number, causeTitle: string, date: string }[] = [{
    _id: '',
    organization: '',
    donor: '',
    amount: 0,
    causeTitle: '',
    date: ''
  }]

  //number of charity
  charityCount: number = 0
  //fetching the all the causes
  causesCount: number = 0
  //donor count
  donorCount: number = 0


  //Constructor
  constructor(private http: HttpClient, private router: Router) {
  }


  ngOnInit(): void {
    this.fetchData();
    this.charityFetch();
    this.donorFetch();
  }


  /**This is the method which get the charity details at the beginning
   *
   */
  fetchData() {
    const apiUrl = 'http://localhost:3000/admin/orgDetails';
    this.http.get<any[]>(apiUrl).subscribe(
      (data) => {
        //to get the number of charity
        this.charityCount = data.length;
      },
      (error) => {
        console.error('Error fetching data:', error);
      }
    );
  }


  /**This is the method to get the charity Details
   *
   */
  charityFetch() {
    const apiUrl = 'http://localhost:3000/donor/causes';

    this.http.get<any[]>(apiUrl).subscribe(
      (data) => {
        //to get the number of Causes
        this.causesCount = data.length;
      },
      (error) => {
        console.error('Error fetching data:', error);
      }
    );
  }


  /**This is the method to get the number of donor
   *
   */
  donorFetch() {
    const apiUrl = 'http://localhost:3000/donor/donorList';

    this.http.get<any[]>(apiUrl).subscribe(

      (data) => {
        //to get the number of Causes
        this.donorCount = data.length;
      },
      (error) => {
        console.error('Error fetching data:', error);
      }
    );
  }

/**This method is used to fetch the list of donation that is being made by
 * the donor to which organization
 */
  donationFetch() {
    const apiUrl = 'http://localhost:3000/admin/donationList';

    this.http.get<any[]>(apiUrl).subscribe(

      (data) => {
        // Transform the fetched data
        this.donation_array = data.map(item => ({
          _id: item._id,
          organization: item.organization,
          donor: item.organization,
          amount: item.amount,
          causeTitle: item.causeTitle,
          date: this.formatDate(new Date(item.date))
        }));
      },
      (error) => {
        console.error('Error fetching data:', error);
      }
    );
  }

    /**This is the method to make the date formated
     * @param {Date} date It take the date that needs formating
     */
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
