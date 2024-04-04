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
import { SignUpDonorComponent } from './sign-up-donor/sign-up-donor.component';
import { ForgetPasswordComponent } from './forget-password/forget-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { ConfirmationPageComponent } from './confirmation-page/confirmation-page.component';

import { ChartyListComponent } from './AdminComponents/charty-list/charty-list.component';
import { DonorListComponent } from './AdminComponents/donor-list/donor-list.component';
import { SignUpOrganizationComponent } from './sign-up-organization/sign-up-organization.component';
import { SignInOrganizationComponent } from './sign-in-organization/sign-in-organization.component';

import { MyCausePageComponent } from './my-cause-page/my-cause-page.component';
import { CauseCardComponent } from './cause-card/cause-card.component';
import { CharityInfoComponent } from './charity-info/charity-info.component';
import { CreateCauseComponent } from './create-cause/create-cause.component';
import { Error404Component } from './error404/error404.component';

export const routes: Routes = [
  { path: '', component: LandingComponent },
  { path: 'aboutUs', component: AboutservicesComponent },
  { path: 'services', component: ServicesComponent },
  { path: 'gallery', component: GalleryComponent },
  { path: 'addNewOrphanage', component: AddNewOrphanageComponent },

  { path: 'donorsignup', component: SignUpDonorComponent},
  { path: 'blog', component: BlogComponent },
  { path: 'causes', component: CausesComponent },
  { path: '', component: LandingComponent },

  //path for admin
  {path:'admin',component:AdminDashboardComponent},
  {path:'charityrequest',component:CharityRequestComponent},
  {path:'donation',component:DonationComponent},
  {path:'donorList',component:DonorListComponent},
  {path:'charityList',component:ChartyListComponent},


  {path:'profile',component:DonorProfilePageComponent},
  {path:'createcause',component:CreateCauseComponent},
  { path: 'causeCard', component: CauseCardComponent },
  { path: 'causeDetail', component: CharityInfoComponent },

  //signin and signup for Donor and admin
  { path: 'donorsignin', component: SigninComponent },
  {path:'donorsignup',component:SigninComponent},

   //signin and signup for Organization
  { path: 'orgsignin', component: SignInOrganizationComponent },
  { path: 'orgsignup', component: SignUpOrganizationComponent },
  { path: 'forgotpassword', component: ForgetPasswordComponent },
  { path: 'resetpassword', component: ResetPasswordComponent},


  //error & confirmation  page
  { path: 'confirmationpage', component: ConfirmationPageComponent },
  {path:'**',component:Error404Component}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
