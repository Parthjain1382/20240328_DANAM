import { Component } from '@angular/core';
import { TableComponentComponent } from '../table-component/table-component.component';

@Component({
  selector: 'app-donor-profile-page',
  standalone: true,
  imports: [TableComponentComponent],
  templateUrl: './donor-profile-page.component.html',
  styleUrl: './donor-profile-page.component.css'
})
export class DonorProfilePageComponent {
  amount: number = 0;
  totalAmountFromChild: number = 0;
  totalDonationsDonated: number = 0;

  onTotalAmountChanged(totalAmount: number): void {
    this.totalAmountFromChild = totalAmount;
    console.log('Total amount donated:', this.totalAmountFromChild);
    this.amount = this.totalAmountFromChild;
  }

  onCalculatingTotalDonations(totalDonations: number): void {
    this.totalDonationsDonated = totalDonations;
  }
}
