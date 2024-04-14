import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-gallery',
  standalone: true,
  imports: [],
  templateUrl: './gallery.component.html',
  styleUrl: './gallery.component.css'
})
export class GalleryComponent implements OnInit {
imageArray:{descriptionImage:string}[]=[]

ngOnInit(): void {this.fetchImage()}

constructor(private http:HttpClient){
}
fetchImage(){
  const url = `http://localhost:3000/donor/causes`;
  this.http.get<any[]>(url).subscribe({
    next: (response) => {
      this.imageArray=response
    }
  })
}

}
