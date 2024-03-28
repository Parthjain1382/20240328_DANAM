import { Component } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { OwlModule } from "ngx-owl-carousel";
import { CarouselModule } from 'ngx-owl-carousel-o';
import { SlickCarouselModule } from 'ngx-slick-carousel';
@Component({
  selector: 'app-carasol',
  standalone: true,
  imports: [CarouselModule,SlickCarouselModule],
  templateUrl: './carasol.component.html',
  styleUrl: './carasol.component.css'
})
export class CarasolComponent {

  // customOptions: OwlOptions = {
  //   loop: true,
  //   mouseDrag: false,
  //   touchDrag: false,
  //   pullDrag: false,
  //   dots: false,
  //   navSpeed: 700,
  //   navText: ['', ''],
  //   responsive: {
  //     0: {
  //       items: 1
  //     },
  //     400: {
  //       items: 2
  //     },
  //     740: {
  //       items: 3
  //     },
  //     940: {
  //       items: 4
  //     }
  //   },
  //   nav: true
  // }
  slides = [
    {img:"https://images.rawpixel.com/image_800/czNmcy1wcml2YXRlL3Jhd3BpeGVsX2ltYWdlcy93ZWJzaXRlX2NvbnRlbnQvbHIvczkzLXBtLTI3NTcuanBn.jpg"},
    {img: "https://plus.unsplash.com/premium_photo-1681492071459-3a45f4289743?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"},
    {img: "https://plus.unsplash.com/premium_photo-1681492071459-3a45f4289743?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"},
    {img: "https://plus.unsplash.com/premium_photo-1681492071459-3a45f4289743?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"},

  ];
  slideConfig = {"slidesToShow": 1, "slidesToScroll": 1};

  addSlide() {
    this.slides.push({img: "http://placehold.it/350x150/777777"})
  }

  removeSlide() {
    this.slides.length = this.slides.length - 1;
  }
}
