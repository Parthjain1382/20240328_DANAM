import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import {MatTableModule} from '@angular/material/table';

import {MatButtonModule} from '@angular/material/button';
import { PeriodicElement } from '../constants';


// const ELEMENT_DATA: PeriodicElement[] = [
//   { srno: 1, cause: 'Animal Welfare', amount_donated: 100.50, date: "2023-03-29" },
//   { srno: 2, cause: 'Environmental Protection', amount_donated: 250.75, date: "2023-03-28" },
//   { srno: 3, cause: 'Education', amount_donated: 125.25, date: "2023-03-27" },
//   { srno: 4, cause: 'Disaster Relief', amount_donated: 300.00, date: "2023-03-26" },
//   { srno: 5, cause: 'Medical Research', amount_donated: 75.00, date: "2023-03-25" },
//   { srno: 6, cause: 'Homelessness Support', amount_donated: 150.00, date: "2023-03-24" },
//   { srno: 7, cause: 'Arts & Culture', amount_donated: 200.25, date: "2023-03-23" },
//   { srno: 8, cause: 'Human Rights Advocacy', amount_donated: 85.75, date: "2023-03-22" },
//   { srno: 9, cause: 'Scientific Research', amount_donated: 425.00, date: "2023-03-21" },
//   { srno: 10, cause: 'Community Development', amount_donated: 178.50, date: "2023-03-20" },
// ];


// export class TableComponentComponent {
//   displayedColumns: string[] = ['srno', 'cause', 'amount_donated', 'date','buttons'];
//   dataSource = ELEMENT_DATA;
// }


import { DonationsProfileServiceService } from '../services/donationsProfileService/donations-profile-service.service';

@Component({
  selector: 'app-table-component',
  standalone: true,
  imports: [MatTableModule,MatButtonModule],
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

  constructor(private dataService: DonationsProfileServiceService) { }

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
