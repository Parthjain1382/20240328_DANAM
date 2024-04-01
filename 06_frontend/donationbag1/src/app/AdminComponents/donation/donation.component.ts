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
  donor_array: {_id:string,donor_name:string,email: string, address: string, phone_number: string,numberOfDonation:number}[]=[{
    _id:'',
    donor_name:'',
    email:'',
    address:'',
    phone_number:'',
    numberOfDonation:0
  }]

  //number of charity
  charityCount:number=0
  //fetching the all the causes
  causesCount:number=0
  //donor count
  donorCount:number=0


 //Constructor
constructor(private http: HttpClient,private router:Router) {
}


ngOnInit(): void {
  this.fetchData();
  this.charityFetch();
  this.donorFetch();
}


/**This is the method which get the charity details at the beginning
 *
 */
fetchData(){
  const apiUrl = 'http://localhost:3000/admin/orgDetails';
  this.http.get<any[]>(apiUrl).subscribe(
    (data) => {
       //to get the number of charity
      this.charityCount=data.length;
    },
    (error) => {
      console.error('Error fetching data:', error);
    }
  );
}


/**This is the method to get the charity Details
 *
 */
charityFetch(){
  const apiUrl='http://localhost:3000/donor/causes';

  this.http.get<any[]>(apiUrl).subscribe(
    (data) => {
      //to get the number of Causes
      this.causesCount=data.length;
    },
    (error) => {
      console.error('Error fetching data:', error);
    }
  );
}


/**This is the method to get the number of donor
 *
 */
donorFetch(){
  const apiUrl='http://localhost:3000/donor/donorList';

  this.http.get<any[]>(apiUrl).subscribe(

    (data) => {
      //to get the number of Causes
      this.donorCount = data.length;
        // Transform the fetched data
        this.donor = data.map(item => ({
          _id:item._id,
          charity_name: item.name, // Assuming you want to map donor_name to charity_name
          email: item.email,
          Location: item.location,
          contact_info: item.contact_no? item.contact_no:"7388709565"
        }));
    },
    (error) => {
      console.error('Error fetching data:', error);
    }
  );
}


}
