import { Component, OnInit } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from '../../../environment';

@Component({
  selector: 'app-donor-list',
  standalone: true,
  imports: [],
  templateUrl: './donor-list.component.html',
  styleUrl: './donor-list.component.css'
})
export class DonorListComponent implements OnInit{
private apiUrl = environment.apiUrl;

//donor_array storing all the data in
donor_array: {_id:string,donor_name:string,email: string, address: string, phone_number: string,numberOfDonation:number}[]=[]

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
fetchData(){
const apiUrl = `${this.apiUrl}/admin/orgDetails`;

const jwt = localStorage.getItem("userToken");
const headers = {
  headers: new HttpHeaders({
    'Authorization': `Bearer ${jwt}`
  })
};
this.http.get<any[]>(apiUrl,headers).subscribe(
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
const apiUrl=`${this.apiUrl}/donor/causes`;
const jwt = localStorage.getItem("userToken");
const headers = {
  headers: new HttpHeaders({
    'Authorization': `Bearer ${jwt}`
  })
};
this.http.get<any[]>(apiUrl,headers).subscribe(
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
const apiUrl=`${this.apiUrl}/donor/donorList`;
const jwt = localStorage.getItem("userToken");

const headers = {
  headers: new HttpHeaders({
    'Authorization': `Bearer ${jwt}`
  })
};

this.http.get<any[]>(apiUrl,headers).subscribe(

  (data) => {
    console.log(data);

    //to get the number of Causes
    this.donorCount = data.length;
      // Transform the fetched data
      this.donor_array = data.map(item => ({
        _id:item._id,
        donor_name:item.username,
        email:item.email,
        address:item.address,
        phone_number:item.phone_number,
        numberOfDonation:item.numberOfDonations
      }));

  },
  (error) => {
    console.error('Error fetching data:', error);
  }
);
}

}
