import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; // Import HttpClient
import { Observable } from 'rxjs'; // Import Observable

@Injectable({
  providedIn: 'root'
})
export class CloudinaryService {
  // Inject HttpClient into your service
  constructor(private http: HttpClient) { }

  // Method to upload images to Cloudinary
  uploadSignature(vals: FormData): Observable<any> {
    // Assuming 'vals' is a FormData object that includes the file and other necessary data for the upload
    return this.http.post('https://api.cloudinary.com/v1_1/ds0vrexpf/image/upload', vals);
    // Make sure to replace 'your_cloud_name' with your actual Cloudinary cloud name
  }
}
