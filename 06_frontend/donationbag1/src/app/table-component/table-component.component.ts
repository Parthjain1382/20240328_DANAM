import { Component } from '@angular/core';
import {MatTableModule} from '@angular/material/table';

import {MatButtonModule} from '@angular/material/button';

export interface PeriodicElement {
  cause: string;
  srno: number;
  amount_donated: number;
  date: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { srno: 1, cause: 'Animal Welfare', amount_donated: 100.50, date: "2023-03-29" },
  { srno: 2, cause: 'Environmental Protection', amount_donated: 250.75, date: "2023-03-28" },
  { srno: 3, cause: 'Education', amount_donated: 125.25, date: "2023-03-27" },
  { srno: 4, cause: 'Disaster Relief', amount_donated: 300.00, date: "2023-03-26" },
  { srno: 5, cause: 'Medical Research', amount_donated: 75.00, date: "2023-03-25" },
  { srno: 6, cause: 'Homelessness Support', amount_donated: 150.00, date: "2023-03-24" },
  { srno: 7, cause: 'Arts & Culture', amount_donated: 200.25, date: "2023-03-23" },
  { srno: 8, cause: 'Human Rights Advocacy', amount_donated: 85.75, date: "2023-03-22" },
  { srno: 9, cause: 'Scientific Research', amount_donated: 425.00, date: "2023-03-21" },
  { srno: 10, cause: 'Community Development', amount_donated: 178.50, date: "2023-03-20" },
];

@Component({
  selector: 'app-table-component',
  standalone: true,
  imports: [MatTableModule,MatButtonModule],
  templateUrl: './table-component.component.html',
  styleUrl: './table-component.component.css'
})
export class TableComponentComponent {
  displayedColumns: string[] = ['srno', 'cause', 'amount_donated', 'date','buttons'];
  dataSource = ELEMENT_DATA;
}
