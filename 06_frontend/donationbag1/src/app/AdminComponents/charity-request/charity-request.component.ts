import { Component,  OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { formatDate } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgClass } from '@angular/common';
import { Router } from '@angular/router';
@Component({
  selector: 'app-charity-request',
  standalone: true,
  imports: [FormsModule,NgClass],
  templateUrl: './charity-request.component.html',
  styleUrl: './charity-request.component.css'
})
export class CharityRequestComponent implements OnInit{

  //Intialization of the charity array
  charity_array: { _id:string,orphanage_name: string, date: string, category: string, amount: number, title: string }[] = [{
    _id:"45464",
    orphanage_name: 'Pranay orphanage',
    date: '2024-03-12',
    category: 'health',
    amount: 5000,
    title: "title",
  }];

  //Constructor
  constructor(private http: HttpClient,private router:Router) {
  }

  //
  ngOnInit(): void {
    this.fetchData();
  }



  /**This is method when the component refreshes the page is loaded
   * with status = "pending"
   *
   */
    fetchData() {
      const apiUrl = 'http://localhost:3000/admin/requests?status=pending';
      this.http.get<any[]>(apiUrl).subscribe(
        (data) => {
          // Transform the fetched data
          this.charity_array = data.map(item => ({
            _id:item._id,
            orphanage_name: item.organization ? item.organization.name : 'Unknown',
            date: this.formatDate(new Date(item.date)), // Use this.formatDate to get the date formatted correctly
            category: item.category,
            amount: item.fundsRequired,
            title: item.title
          }));
        },
        (error) => {
          console.error('Error fetching data:', error);
        }
      );
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


    /**This is the function to accept a given cause by admin
     *This changes the status of the cause as accepted
     * @param _id To search with the unique id
     */
    AcceptCause(_id:string){
      console.log(_id);

       // Show a confirmation dialog
       if (confirm('Are you sure you want to Accept this cause?')) {
        // User confirmed, proceed to call the PUT API
        this.callAcceptCauseApi(_id);
      } else {
        // User did not confirm, do nothing
        console.log('Acceptance cancelled');
      }
    }

    /**This is the method responsible for the changing the status of the cause
     * to accepted
     * @param _id To search with the unique id
     */
    private callAcceptCauseApi(_id: string) {
      const apiUrl = `http://localhost:3000/admin/update/request`;

      //body param as status and id
      const body = { id:_id,status: 'accepted' };
      this.http.put(apiUrl, body).subscribe({
        next: (response) => {
          console.log('Cause accepted successfully:', response);
          this.refreshPage();
       },
        error: (error) => {
          console.error('Error accepting cause:', error);
        }
      });
    }

    /**This is the method to delete the cause which is not valid by the admin
     *@param _id To search with the unique id
     */
    DeleteCause(_id:string){
       // Show a confirmation dialog

       if (confirm('Are you sure you want to Delete this cause?')) {
        // User confirmed, proceed to call the PUT API
        this.calldeleteCauseApi(_id);
      } else {
        // User did not confirm, do nothing
        console.log('Delete cancelled');
      }
    }

    /**This method deletes the id by the admin
     * @param _id
     */
    private calldeleteCauseApi(_id: string) {
      const apiUrl = `http://localhost:3000/admin/deleteCause`;
      console.log(_id);

      //body param as status and id
      const body = { id:_id };

      this.http.delete(apiUrl, { body: body }).subscribe({
        next: (response) => {
          console.log('Cause Delete successfully:', response);
          this.refreshPage();
       },
        error: (error) => {
          console.error('Error deleting cause:', error);

        }
      });
    }

    //refresh the page
    private refreshPage() {
        this.router.navigate(['/charityrequest']); // Navigate back to the current component
    }
  }
