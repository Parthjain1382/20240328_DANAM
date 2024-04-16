import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { AuthServiceService } from './auth-service.service';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root', // This ensures your guard is provided at the root level
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthServiceService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    if (this.authService.isAuthTokenPresent()) {
      // User is authenticated, allow access
      return true;
    } else {
      // User is not authenticated, redirect to login page
      this.router.navigate(['/']); // Optionally pass returnUrl for post-login redirection
      return false;
    }
  }
}
