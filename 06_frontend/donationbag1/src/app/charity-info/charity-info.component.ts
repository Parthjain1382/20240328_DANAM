import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AfterViewChecked, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';
import swal from 'sweetalert';
import { environment } from '../../environment';

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
  progressBar: number = 0;

  userToken: string | null = ""
  role: string | null = ''
  organization: any
  AmountDonation: number = 0
  apiUrl = environment.apiUrl;
  constructor(private http: HttpClient, private route: ActivatedRoute, private router: Router) { }


  /**Razor Pay integration
   *
  */
  async payNow() {

    this.userToken = localStorage.getItem('userToken')
    this.role = localStorage.getItem('role')

    //Funds Raised
    const fundsRaised = this.content.fundsRaised
    //Funds Required
    const fundsRequired = this.content.fundsRequired
    //Required More Amount
    const difference = fundsRequired - fundsRaised


    if (!(this.role == 'donor')) {
      await Swal.fire({
        title: "Not Donor",
        text: `You are not Logged In as Donor`,
        icon: "error"
      })
    }

    else {
      // Assuming there's a minimum required amount (in rupees)
      const minimumRequiredAmount = 10; // Example minimum amount

      // // Validate if the donation amount meets the minimum requirement
      if (this.AmountDonation < minimumRequiredAmount) {

        await Swal.fire({
          title: "Amount Donation",
          text: `The minimum donation amount is ${minimumRequiredAmount} INR.`
        })
        return; // Exit the function if the amount is less than required
      }

      const taxRate = 0.03
      const taxAmount = this.AmountDonation * taxRate

      // Calculate the net amount after deducting tax
      const netAmount = this.AmountDonation - taxAmount;
      // Inform the user about the net amount after tax deduction

      await Swal.fire({
        title: "Net Amount",
        text: `The net donation amount after deducting tax is ${netAmount} INR.`,
        icon: "success"
      }
      );

      //If the amount required is already raised
      if (difference <= netAmount) {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'The Donation is More than Needed, Thank You.',
        });
      }

      else {
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
          handler:(response:any)=>{
            this.addNewDonation(options)
          }
        };

        //on Success Callback
        const successCallback =  (paymentId: any) => {
        };

        //on failure callback
        const failureCallback = (error: any) => {
          Swal.fire({
            title: "transcation Error",
            text: `Can't Complete the Transcation, Sorry`,
            icon: "error"
          });
          console.error('Payment failed with error:', error);
        };

        Razorpay.open(options, successCallback, failureCallback);

      }
    }
  }


  /**Adding New Donation to the donation Table
   * @param options all option needed to payment
   */
   addNewDonation(options: any) {

    //getting the jwt and donorID
    const jwt = localStorage.getItem('userToken');
    const donorId = localStorage.getItem('donarId');

    //Funds Raised
    const fundsRaised = this.content.fundsRaised
    //Funds Required
    const fundsRequired = this.content.fundsRequired
    //Required More Amount
    const difference = fundsRequired - fundsRaised


    //If the difference is greater than the user is paying He can Donate
    if (difference >= (options.amount) / 100) {
      //Header Params
      const httpOptions = {
        headers: new HttpHeaders({
          'Authorization': `Bearer ${jwt}`
        }),
      };

      //first all three function are resolved then the again fetch
      Promise.all([
        this.addNewDonationObject(jwt, donorId, options, httpOptions),
        this.putChangeInCause(options, httpOptions),
        this.putChangeUser(donorId, options, httpOptions)
      ]).then(() => {
        window.location.reload();
      }).catch(error => {
        console.error('An error occurred:', error);
      });

    }

  }

  /**To change the Cause Database When Donor Donates to that Specific Cause
   * @param options The data needs to change in database like the amount etc
   * @param httpOptions Used For Authorization
   */
  putChangeInCause(options: any, httpOptions: any) {
    const url = `${this.apiUrl}/donor/CauseDataChange?causeId=${this.causeId}`;
    const body = {
      amountDonated: options.amount / 100
    }
    this.http.put(url, body, httpOptions).subscribe({
      next: (response) => {
        //If successfully added
        console.log("successfully Added to Cause Schema" + response);
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
  putChangeUser(donorId: any, options: any, httpOptions: any) {
    const url = `${this.apiUrl}/donor/userDonate?donorId=${donorId}`;
    const body = {
      amountDonated: options.amount / 100
    }
    this.http.put(url, body, httpOptions).subscribe({
      next: (response) => {
        console.log("successfully Added to User Schema" + response);
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
  addNewDonationObject(jwt: string | null, donorId: string | null, options: any, httpOptions: any) {
    const body = {
      organization: this.content.organization,
      amount: options.amount / 100,
      causeTitle: this.content.title,
      donor: donorId
    }
    const url = `${this.apiUrl}/donor/donate`;
    //Api Call for Posting New Object in the Donation Database
    this.http.post(url, body, httpOptions).subscribe({
      next: (response) => {
        console.log("successfully Added to Donation Schema" );
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
    const url = `${this.apiUrl}/donor/getCause?_id=${this.causeId}`;
    // HTTP GET request to fetch page content

    this.http.get<any>(url).subscribe({
      next: (response) => {
        this.content = response;

        //Rounding off the required and raised Funds
        this.content.fundsRaised = Math.floor(response.fundsRaised)
        this.content.fundsRequired = Math.floor(response.fundsRequired)

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
    const url = `${this.apiUrl}/donor/getOrganization?_id=${organizationId}`;

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
