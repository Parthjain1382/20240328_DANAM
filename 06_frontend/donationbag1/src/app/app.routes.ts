import { Routes, RouterModule } from '@angular/router';
import { LandingComponent } from './landing/landing.component';
import { NgModule } from '@angular/core';
import { aboutUsComponent } from './reUsableComponent/aboutUs/aboutUs.component';
import { AppComponent } from './app.component';
import { AboutservicesComponent } from './aboutservices/aboutservices.component';
import { ServicesComponent } from './reUsableComponent/services/services.component';
import { GalleryComponent } from './gallery/gallery.component';
import { SigninComponent } from './signin/signin.component';
import { AdminDashboardComponent } from './AdminComponents/admin-dashboard/admin-dashboard.component';
import { CharityRequestComponent } from './AdminComponents/charity-request/charity-request.component';
import { DonationComponent } from './AdminComponents/donation/donation.component';
import { BlogComponent } from './blog/blog.component';
import { CausesComponent } from './causes/causes.component';
import { DonorProfilePageComponent } from './donor-profile-page/donor-profile-page.component';
import { SignUpDonorComponent } from './sign-up-donor/sign-up-donor.component';
import { ForgetPasswordComponent } from './forget-password/forget-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';

import { ChartyListComponent } from './AdminComponents/charty-list/charty-list.component';
import { DonorListComponent } from './AdminComponents/donor-list/donor-list.component';
import { SignUpOrganizationComponent } from './sign-up-organization/sign-up-organization.component';
import { SignInOrganizationComponent } from './sign-in-organization/sign-in-organization.component';

import { MyCausePageComponent } from './my-cause-page/my-cause-page.component';
import { CauseCardComponent } from './cause-card/cause-card.component';
import { CharityInfoComponent } from './charity-info/charity-info.component';
import { CreateCauseComponent } from './create-cause/create-cause.component';
import { Error404Component } from './error404/error404.component';
import { AuthGuard } from './services/authServices/auth-guard.service';

export const routes: Routes = [
  
  { path: '', component: LandingComponent },
  { path: 'aboutUs', component: AboutservicesComponent },
  { path: 'services', component: ServicesComponent },
  { path: 'gallery', component: GalleryComponent },
  { path: 'blog', component: BlogComponent },
  { path: 'causes', component: CausesComponent },

  //path for admin
  {path:'admin',component:AdminDashboardComponent,canActivate: [AuthGuard],data: {expectedRole: 'admin'}},
  {path:'charityrequest',canActivate: [AuthGuard],data: {expectedRole: 'admin'},component:CharityRequestComponent},
  {path:'donation',canActivate: [AuthGuard],data: {expectedRole: 'admin'},component:DonationComponent},
  {path:'donorList',canActivate: [AuthGuard],data: {expectedRole: 'admin'},component:DonorListComponent},
  {path:'charityList',canActivate: [AuthGuard],data: {expectedRole: 'admin'},component:ChartyListComponent},


  {path:'profile',canActivate: [AuthGuard],data: {expectedRole: 'donor'},component:DonorProfilePageComponent},
  {path:'createcause',canActivate: [AuthGuard],data: {expectedRole: 'organization'},component:CreateCauseComponent},
  { path: 'causeCard', component: CauseCardComponent },
  { path: 'causeDetail', component: CharityInfoComponent },

  //signin and signup for Donor and admin
  { path: 'donorsignup', component: SignUpDonorComponent},
  { path: 'donorsignin', component: SigninComponent },


   //signin and signup for Organization
  { path: 'orgsignin', component: SignInOrganizationComponent },
  { path: 'orgsignup', component: SignUpOrganizationComponent },

  //forgot and reset path
  { path: 'forgotpassword', component: ForgetPasswordComponent },
  { path: 'resetpassword', component: ResetPasswordComponent},


  //error  page
  {path:'**',component:Error404Component}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
