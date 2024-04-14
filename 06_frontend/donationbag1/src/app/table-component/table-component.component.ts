import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import {MatTableModule} from '@angular/material/table';

import {MatButtonModule} from '@angular/material/button';
import { PeriodicElement } from '../constants';
import { DonationsProfileServiceService } from '../services/donationsProfileService/donations-profile-service.service';
import { FormsModule } from '@angular/forms';
import { NgStyle } from '@angular/common';
import { Router } from '@angular/router';
@Component({
  selector: 'app-table-component',
  standalone: true,
  imports: [MatTableModule,MatButtonModule,FormsModule,NgStyle],
  templateUrl: './table-component.component.html',
  styleUrl: './table-component.component.css'
})
export class TableComponentComponent implements OnInit {
 //defining the Variables
  displayedColumns: string[] = ['srno', 'cause', 'amount_donated', 'date', 'buttons'];
  dataSource: PeriodicElement[] = [];
  totalAmount: number = 0;
  totalDonations: number = 0;
  srno: number = 0;


  @Output() totalAmountChanged = new EventEmitter<number>();
  @Output() allDonations = new EventEmitter<number>();

  constructor(private dataService: DonationsProfileServiceService,
    private router:Router
  ) { }

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.dataService.getTableData().subscribe(data => {
      this.dataSource = data


      //looping through the element of the dataSource
      for (let i = 0; i < this.dataSource.length; i++){
        let temp = 0
        let date:string
        temp += Math.floor(this.dataSource[i].amount)
        this.srno+=1
        this.totalAmount += temp
        this.totalDonations += 1
      }

      //emmitting to the parent component
      this.totalAmountChanged.emit(this.totalAmount);
      this.allDonations.emit(this.totalDonations);
    });

  }

  //getting the cause by id
  fetchCause(id:string):void{
    this.router.navigate(['/causeDetail'], {
      queryParams: { _id: id },
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


