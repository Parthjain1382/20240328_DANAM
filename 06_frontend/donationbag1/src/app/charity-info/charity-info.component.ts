import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AfterViewChecked, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
declare var Razorpay: any;

@Component({
  selector: 'app-charity-info',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './charity-info.component.html',
  styleUrl: './charity-info.component.css',
})
export class CharityInfoComponent implements OnInit {
  causeId: any;
  token: any;
  content: any;
  organization_name: string = '';
  progressBar:number=0;



  organization: any
  AmountDonation: number = 0

  constructor(private http: HttpClient, private route: ActivatedRoute) { }


  /**Razor Pay integration
   *
  */
  payNow() {
    // Assuming there's a minimum required amount (in rupees)
    const minimumRequiredAmount = 10; // Example minimum amount

    // Validate if the donation amount meets the minimum requirement
    if (this.AmountDonation < minimumRequiredAmount) {
      alert(`The minimum donation amount is ${minimumRequiredAmount} INR.`);
      return; // Exit the function if the amount is less than required
    }

    const taxRate = 0.03;
    const taxAmount = this.AmountDonation * taxRate;

    // Calculate the net amount after deducting tax
    const netAmount = this.AmountDonation - taxAmount;

    // Inform the user about the net amount after tax deduction
    alert(`The net donation amount after deducting tax is ${netAmount} INR.`);

    // Convert the net amount to the smallest currency unit (paise)
    const netAmountInPaise = Math.floor(netAmount * 100);

    const options = {
      description: 'Sample Razorpay demo',
      currency: 'INR',
      amount: netAmountInPaise,
      name: 'Daanam',
      key: 'rzp_test_D7Ve9gsjct6KgY',
      image: '',
      prefill: {
        name: 'Pranay Jain',
        email: 'pranayjain1382@gmail.com',
        contact: '7387066313',
      },
      theme: {
        color: '#51BE78',
      },
      modal: {
        ondismiss: () => {
          console.log('Payment dismissed');
        },
      },

    };

    const successCallback = (paymentId: any) => {
      console.log('Payment successful with ID:', paymentId);
    };

    const failureCallback = (error: any) => {
      console.error('Payment failed with error:', error);
    };

    Razorpay.open(options, successCallback, failureCallback);

    this.addNewDonation(options)
  }


  addNewDonation(options: any) {
    console.log("hello");
    //getting the jwt and donorID
    const jwt = localStorage.getItem('userToken');
    const donorId = localStorage.getItem('donarId');

    //Funds Raised
    const fundsRaised = this.content.fundsRaised
    //Funds Required
    const fundsRequired = this.content.fundsRequired
    //Required More Amount
    const difference = fundsRequired - fundsRaised

    this.progressBar=Math.floor((fundsRaised / fundsRequired) * 100)
    console.log("progressbarincharityinfo",this.progressBar);

    //If the difference is greater than the user is paying He can Donate
    if (difference >= (options.amount) / 100) {
      //Header Params
      const httpOptions = {
        headers: new HttpHeaders({
          'Authorization': `Bearer ${jwt}`
        }),
      };

      //To create a new object in donation table
      this.addNewDonationObject(jwt,donorId,options,httpOptions)

      //To use put to change fundsRaised and FundsRequired
      this.putChangeInCause(options,httpOptions)

      //To change the user Schema for number of Donation and Contribution Amount
      this.putChangeUser(donorId,options,httpOptions)

    }
  }

  /**To change the Cause Database When Donor Donates to that Specific Cause
   * @param options The data needs to change in database like the amount etc
   * @param httpOptions Used For Authorization
   */
  putChangeInCause(options:any,httpOptions:any){
    const url = `http://localhost:3000/donor/CauseDataChange?causeId=${this.causeId}`;

    const body={
        amountDonated:options.amount/100
    }
    this.http.put(url,body,httpOptions).subscribe({
      next: (response) => {
        //If successfully added
        console.log("successfully Added to Cause Schema"+response);
     },
      error: (error) => {
        console.error('Error changing the Cause data', error);
      }
    });
  }

  /**To change the User Database When Donor Donates to that Specific Cause
   * @param donorId Needed to search for the Donor in the Database
   * @param options The data needs to change in database like the amount etc
   * @param httpOptions Used For Authorization
   */
  putChangeUser(donorId:any,options:any,httpOptions:any){
    const url = `http://localhost:3000/donor/userDonate?donorId=${donorId}`;
    const body={
        amountDonated:options.amount/100
    }
    this.http.put(url,body,httpOptions).subscribe({
      next: (response) => {
        console.log("successfully Added to User Schema"+response);
     },
      error: (error) => {
        console.error('Error changing the User data', error);
      }
    });
  }

  /**To create new Object when the donation is Done
 * @param body The key value pair of Model Donation
 * @param httpOptions The authorization Token
 */
  addNewDonationObject(jwt:string|null,donorId:string|null,options:any,httpOptions:any){


    const body = {
      organization: this.content.organization,
      amount: options.amount/100,
      causeTitle: this.content.title,
      donor: donorId
    }
    const url = 'http://localhost:3000/donor/donate';
    //Api Call for Posting New Object in the Donation Database
    this.http.post(url,body,httpOptions).subscribe({
      next: (response) => {
        console.log("successfully Added to Donation Schema"+response);
     },
      error: (error) => {
        console.error('Error changing the Donation data', error);
      }
    });
}


  //ngOnInit
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

  //Fetching the Cause Content
  fetchCauseContent(): void {
    const url = `http://localhost:3000/donor/getCause?_id=${this.causeId}`;
    // HTTP GET request to fetch page content
    this.http.get<any>(url).subscribe({
      next: (response) => {
        this.content = response;
        const organizationId = response.organization;
        if (organizationId) {
          this.getOrganizationName(organizationId);
        }
      },
      error: (error) => {
        console.error('Error:', error);
      },
    });
  }

  //Getting the Organization Name
  getOrganizationName(organizationId: string): void {
    const url = `http://localhost:3000/donor/getOrganization?_id=${organizationId}`;

    // HTTP GET request to fetch organization details
    this.http.get<any>(url).subscribe({
      next: (response) => {
        this.organization_name = response.name;
      },
      error: (error) => {
        console.error('Error fetching organization details:', error);
      },
    });
  }

}
