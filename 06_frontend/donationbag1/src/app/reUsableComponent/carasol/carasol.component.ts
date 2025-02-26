import { Component } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { OwlModule } from "ngx-owl-carousel";
import { CarouselModule } from 'ngx-owl-carousel-o';
import { SlickCarouselModule } from 'ngx-slick-carousel';

@Component({
  selector: 'app-carasol',
  standalone: true,
  imports: [CarouselModule, SlickCarouselModule],
  templateUrl: './carasol.component.html',
  styleUrls: ['./carasol.component.css']
})
export class CarasolComponent {


  slides = [
    { img: "https://images.rawpixel.com/image_800/czNmcy1wcml2YXRlL3Jhd3BpeGVsX2ltYWdlcy93ZWJzaXRlX2NvbnRlbnQvbHIvczkzLXBtLTI3NTcuanBn.jpg" },
    { img: "https://images.unsplash.com/flagged/photo-1567002349727-f1d1dcdab101?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8cG92ZXJ0eXxlbnwwfHwwfHx8MA%3D%3D"},
    { img: "https://media.istockphoto.com/id/1347304123/photo/earth-day-diversity.webp?b=1&s=170667a&w=0&k=20&c=dlUtDtqaif2vYyhhP0OXNJkhhklN1MzS4sGVc7-4oek=" },
    { img: "https://images.unsplash.com/photo-1509099836639-18ba1795216d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGNoYXJpdHl8ZW58MHx8MHx8fDA%3D" },
  ];

  slideConfig = {
    "slidesToShow": 1,
    "slidesToScroll": 1,
    "autoplay": true, // Enable autoplay
    "autoplaySpeed": 2500 // Slide every 3 seconds (3000 milliseconds)
  };

  addSlide() {
    this.slides.push({ img: "http://placehold.it/350x150/777777" })
  }

  removeSlide() {
    this.slides.length = this.slides.length - 1;
  }
}
