import { Routes, RouterModule } from '@angular/router';
import { LandingComponent } from './landing/landing.component';
import { NgModule } from '@angular/core';
import { aboutUsComponent } from './reUsableComponent/aboutUs/aboutUs.component';
import { AppComponent } from './app.component';
import { AboutservicesComponent } from './aboutservices/aboutservices.component';
import { ServicesComponent } from './reUsableComponent/services/services.component';
import { GalleryComponent } from './gallery/gallery.component';
import { SigninComponent } from './signin/signin.component';
import { SignupComponent } from './signup/signup.component';
import { AddNewOrphanageComponent } from './add-new-orphanage/add-new-orphanage.component';
import { AdminPageComponent } from './admin-page/admin-page.component';
import { AdminDashboardComponent } from './AdminComponents/admin-dashboard/admin-dashboard.component';
import { CharityRequestComponent } from './AdminComponents/charity-request/charity-request.component';
import { DonationComponent } from './AdminComponents/donation/donation.component';
import { BlogComponent } from './blog/blog.component';
import { CausesComponent } from './causes/causes.component';
import { DonorProfilePageComponent } from './donor-profile-page/donor-profile-page.component';
import { CharityInfoComponent } from './charity-info/charity-info.component';
import { SignUpOrganizationComponent } from './sign-up-organization/sign-up-organization.component';
import { SignUpDonorComponent } from './sign-up-donor/sign-up-donor.component';

export const routes: Routes = [
  { path: '', component: LandingComponent },
  { path: 'aboutUs', component: AboutservicesComponent },
  { path: 'services', component: ServicesComponent },
  { path: 'gallery', component: GalleryComponent },
  { path: 'addNewOrphanage', component: AddNewOrphanageComponent },
  { path: 'signin', component: SigninComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'admin', component: AdminPageComponent },
  { path: 'blog', component: BlogComponent },
  { path: 'causes', component: CausesComponent },
  {path:'',component:LandingComponent},
  {path:'aboutUs',component:AboutservicesComponent  },
  {path:'services',component:ServicesComponent  },
  {path:'gallery',component:GalleryComponent  },
  {path:'addNewOrphanage',component:AddNewOrphanageComponent },
  {path:'signin',component:SigninComponent},
  {path:'signUpOrganization',component:SignUpOrganizationComponent},
  {path:'signUpDonor',component:SignUpDonorComponent},
  {path:'signup',component:SignupComponent},
  // {path:'admin',component:AdminPageComponent},
  // {path:'admin',component:AdminDashboardComponent},
  {path:'charityrequest',component:CharityRequestComponent},
  {path:'donation',component:DonationComponent},
  {path:'profile',component:DonorProfilePageComponent},
  {path:'charityInfo',component:CharityInfoComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
