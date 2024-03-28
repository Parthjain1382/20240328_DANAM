import { Routes,RouterModule } from '@angular/router';
import { LandingComponent } from './landing/landing.component';
import { NgModule } from '@angular/core'
import { aboutUsComponent } from './reUsableComponent/aboutUs/aboutUs.component';
import { AppComponent } from './app.component';
import { AboutservicesComponent } from './aboutservices/aboutservices.component';
import { ServicesComponent } from './reUsableComponent/services/services.component';
import { GalleryComponent } from './gallery/gallery.component';
import { SigninComponent } from './signin/signin.component';
import { SignupComponent } from './signup/signup.component';
import { AddNewOrphanageComponent } from './add-new-orphanage/add-new-orphanage.component';
import { AdminPageComponent } from './admin-page/admin-page.component';

export const routes: Routes = [
  {path:'',component:LandingComponent},
  {path:'aboutUs',component:AboutservicesComponent  },
  {path:'services',component:ServicesComponent  },
  {path:'gallery',component:GalleryComponent  },
  {path:'addNewOrphanage',component:AddNewOrphanageComponent },
  {path:'signin',component:SigninComponent},
  {path:'signup',component:SignupComponent},
  {path:'admin',component:AdminPageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
