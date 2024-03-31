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


  charity_array:{
    orphanage_name: string;
    date: string;
    address: string;
    amount: number;
    email: string;
  }[]=[{ orphanage_name:'Pranay orphanage',
    date:'22-03-2024',
    address:'8, Navabar colony',
    amount:5000,
    email:"pranayjain1382@gmail.com",
  }];

  ngOnInit(): void {
      this.fetchData();
  }

  constructor( private http:HttpClient){}

  fetchData(){

  }

//   charity_array=[{
//   orphanage_name:'Pranay orphanage',
//   date:'22-03-2024',
//   address:'8, Navabar colony',
//   amount:5000,
//   email:"pranayjain1382@gmail.com",
// },
// {
//   orphanage_name:'Pranay orphanage',
//   date:'22-03-2024',
//   address:'8, Navabar colony',
//   amount:5000,
//   email:"pranayjain1382@gmail.com",
// },{
//   orphanage_name:'Pranay orphanage',
//   date:'22-03-2024',
//   address:'8, Navabar colony',
//   amount:5000,
//   email:"pranayjain1382@gmail.com",
// },{
//   orphanage_name:'Pranay orphanage',
//   date:'22-03-2024',
//   address:'8, Navabar colony',
//   amount:5000,
//   email:"pranayjain1382@gmail.com",
// },{
//   orphanage_name:'Pranay orphanage',
//   date:'22-03-2024',
//   address:'8, Navabar colony',
//   amount:5000,
//   email:"pranayjain1382@gmail.com",
// },{
//   orphanage_name:'Pranay orphanage',
//   date:'22-03-2024',
//   address:'8, Navabar colony',
//   amount:5000,
//   email:"pranayjain1382@gmail.com",
// },{
//   orphanage_name:'Pranay orphanage',
//   date:'22-03-2024',
//   address:'8, Navabar colony',
//   amount:5000,
//   email:"pranayjain1382@gmail.com",
// },{
//   orphanage_name:'Pranay orphanage',
//   date:'22-03-2024',
//   address:'8, Navabar colony',
//   amount:5000,
//   email:"pranayjain1382@gmail.com",
// },{
//   orphanage_name:'Pranay orphanage',
//   date:'22-03-2024',
//   address:'8, Navabar colony',
//   amount:5000,
//   email:"pranayjain1382@gmail.com",
// },{
//   orphanage_name:'Pranay orphanage',
//   date:'22-03-2024',
//   address:'8, Navabar colony',
//   amount:5000,
//   email:"pranayjain1382@gmail.com",
// },{
//   orphanage_name:'Pranay orphanage',
//   date:'22-03-2024',
//   address:'8, Navabar colony',
//   amount:5000,
//   email:"pranayjain1382@gmail.com",
// }
// ]


}
