import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { RouterModule } from '@angular/router';
import { NavbarComponent } from './reUsableComponent/navbar/navbar.component';
import { CarasolComponent } from './reUsableComponent/carasol/carasol.component';
import { aboutUsComponent } from './reUsableComponent/aboutUs/aboutUs.component';
import { VisionMissionComponent } from './reUsableComponent/vision-mission/vision-mission.component';
import { ServicesComponent } from './reUsableComponent/services/services.component';
import { FooterComponent } from './reUsableComponent/footer/footer.component';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { PeriodicElement } from './constants';
 
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,NavbarComponent,FooterComponent,RouterModule,aboutUsComponent,HttpClientModule,CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'navbar';

}
