import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-donor-list',
  standalone: true,
  imports: [],
  templateUrl: './donor-list.component.html',
  styleUrl: './donor-list.component.css'
})
export class DonorListComponent implements OnInit{

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


//navigate to respective component
navtoDonorList(){
  this.router.navigate(['/donorList'])
}
navtoCharityRequest(){
this.router.navigate(['/charityList'])
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
      this.donor_array = data.map(item => ({
        _id:item._id,
        donor_name:item.username,
        email:item.email,
        address:item.address,
        phone_number:item.phone_number,
        numberOfDonation:item.numberOfDonations?item.numberOfDonations:0
      }));
      console.log(this.donor_array);

  },
  (error) => {
    console.error('Error fetching data:', error);
  }
);
}

}
