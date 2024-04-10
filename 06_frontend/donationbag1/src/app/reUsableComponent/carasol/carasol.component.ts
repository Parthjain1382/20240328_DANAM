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
  // customOptions: OwlOptions = {
  //   // Your OwlOptions configuration here
  // }

  slides = [
    { img: "https://images.rawpixel.com/image_800/czNmcy1wcml2YXRlL3Jhd3BpeGVsX2ltYWdlcy93ZWJzaXRlX2NvbnRlbnQvbHIvczkzLXBtLTI3NTcuanBn.jpg" },
    { img: "https://plus.unsplash.com/premium_photo-1681492071459-3a45f4289743?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
    { img: "https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8Y2hhcml0eXxlbnwwfHwwfHx8MA%3D%3D" },
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
