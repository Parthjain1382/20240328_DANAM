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
  imports: [CommonModule,FormsModule],
  templateUrl: './charity-info.component.html',
  styleUrl: './charity-info.component.css',
})
export class CharityInfoComponent implements OnInit {
  causeId: any;
  token: any;
  content: any;
  organization:any;
  AmountDonation:number=0

  constructor(private http: HttpClient, private route: ActivatedRoute) {}




  payNow() {
    const options = {
      description: 'Sample Razorpay demo',
      currency: 'INR',
      amount: this,
      name: 'Daanam',
      key: 'rzp_test_D7Ve9gsjct6KgY',
      image: '',
      prefill: {
        name: 'Mugdha Padgelwar',
        email: 'mugdhapadgelwar2002@gmail.com',
        contact: '8459247750',
      },
      theme: {
        color: '#f37254',
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
  }

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
    const url =` http://localhost:3000/donor/getCause?_id=${this.causeId}`;

    // HTTP GET request to fetch page content
    this.http.get<any>(url).subscribe({
      next: (response) => {
        this.content = response;
        console.log(response);
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
  getOrganizationName(organizationId: string): void {
    const url = `http://localhost:3000/donor/getOrganization?_id=${organizationId}`;

    // HTTP GET request to fetch organization details
    this.http.get<any>(url).subscribe({
      next: (response) => {
        this.organization = response;
        console.log(response);
      },
      error: (error) => {
        console.error('Error fetching organization details:', error);
      },
    });
  }
}
