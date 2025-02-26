import { Component, OnInit } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from '../../../environment';


@Component({
  selector: 'app-charty-list',
  standalone: true,
  imports: [],
  templateUrl: './charty-list.component.html',
  styleUrl: './charty-list.component.css'
})
export class ChartyListComponent implements OnInit {

  apiUrl = environment.apiUrl;

  charity_array: {_id:string, charity_name:string,email: string, Location: string, contact_info: string}[] = [{
    _id:'',
    charity_name:"",
    email: '',
    Location: '',
    contact_info: ''
  }];

  //number of charity
  charityCount:number=0
  //fetching the all the causes
  causesCount:number=0
  //donor count
  donorCount:number=0

 //Constructor
constructor(private http: HttpClient,private router:Router) {
}

//
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


  // Prepare the headers, including the Authorization header with the JWT token
  const headers = {
    headers: new HttpHeaders({
      'Authorization': `Bearer ${jwt}`
    })
  };
  this.http.get<any[]>(apiUrl,headers).subscribe(

    (data) => {

      //to get the number of charity
      this.charityCount=data.length;

      // Transform the fetched data
      this.charity_array = data.map(item => ({
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

/**This is the method to get the charity Details
 *
 */
charityFetch(){
  const apiUrl=`${this.apiUrl}/donor/causes`;

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
  const apiUrl=`${this.apiUrl}/donor/donorList`;

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

}
