import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environment';

@Component({
  selector: 'app-gallery',
  standalone: true,
  imports: [],
  templateUrl: './gallery.component.html',
  styleUrl: './gallery.component.css'
})
export class GalleryComponent implements OnInit {
imageArray:{descriptionImage:string}[]=[]
apiUrl = environment.apiUrl;
ngOnInit(): void {this.fetchImage()}

constructor(private http:HttpClient){
}
fetchImage(){
  const url = `${this.apiUrl}/donor/causes`;
  this.http.get<any[]>(url).subscribe({
    next: (response) => {
      this.imageArray=response
    }
  })
}

}
