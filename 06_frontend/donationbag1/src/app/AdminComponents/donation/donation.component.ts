import { Component, OnInit } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from '../../../environment';

@Component({
  selector: 'app-donation',
  standalone: true,
  imports: [],
  templateUrl: './donation.component.html',
  styleUrl: './donation.component.css'
})
export class DonationComponent implements OnInit {

  private apiUrl = environment.apiUrl;
  //donor_array storing all the data in
  donation_array: { _id: string, organization: string, donor: string, amount: number, causeTitle: string, date: string,organization_Name:any }[] = []

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
    this.donationFetch()
  }



//navigate to respective component
navtoDonorList(){
  this.router.navigate(['/donorList'])
}
navtoCharityRequest(){
this.router.navigate(['/charityrequest'])
}
navtoDonation(){
this.router.navigate(['/donation'])
}
navtoCharityList(){
this.router.navigate(['/charityList'])
}

  /**This is the method which get the charity details at the beginning
   *
   */
  fetchData() {
    const apiUrl = `${this.apiUrl}/admin/orgDetails`;
    const jwt = localStorage.getItem("userToken");


    // Prepare the headers, including the Authorization header with the JWT token
    const headers = {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${jwt}`
      })
    };
    this.http.get<any[]>(apiUrl,headers).subscribe(
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
    const apiUrl = `${this.apiUrl}/donor/causes`;


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
    const apiUrl = `${this.apiUrl}/admin/donationList`;

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
    const apiUrl = `${this.apiUrl}/admin/donationList`;
    // Get the JWT token from local storage
    const jwt = localStorage.getItem("userToken");


    // Prepare the headers, including the Authorization header with the JWT token
    const headers = {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${jwt}`
      })
    };


    this.http.get<any[]>(apiUrl,headers).subscribe(

      (data) => {
        // Transform the fetched data
        this.donation_array = data.map(item => ({
          _id: item._id,
          organization: item.organization,
          donor: item.organization,
          amount: item.amount,
          causeTitle: item.causeTitle,
          date: this.formatDate(new Date(item.date)),
          organization_Name:this.getOrganizationName(item.organization)

        })
        );

      },
      (error) => {
        console.error('Error fetching data:', error);
      }
    );
  }


 //Getting the Organization Name
 getOrganizationName(organizationId: string): void {
  const url = `${this.apiUrl}/donor/getOrganization?_id=${organizationId}`;

  // HTTP GET request to fetch organization details
  this.http.get<any>(url).subscribe({
    next: (response) => {


    return response.name
    },
    error: (error) => {
      console.error('Error fetching organization details:', error);
    },
  });
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
