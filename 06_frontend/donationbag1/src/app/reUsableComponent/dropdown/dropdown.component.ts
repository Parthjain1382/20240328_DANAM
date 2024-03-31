import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dropdown',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dropdown.component.html',
  styleUrl: './dropdown.component.css',
})
export class DropdownComponent {
  constructor(private router: Router) {}
  /** Flag indicating whether the dropdown is active or not. */
  dropdownActive = false;

  /**
   * Function to toggle the dropdown menu's visibility.
   */
  toggleDropdown(): void {
    this.dropdownActive = !this.dropdownActive;
  }

  navigateTo(route: string): void {
    // Use the Angular Router to navigate to the specified route
    this.router.navigate([`/${route}`]);
  }

  logOut(): void {
    this.router.navigate(['/']); // Redirect to the home page
  }
}
