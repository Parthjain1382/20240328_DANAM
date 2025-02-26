import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthServiceService } from './auth-service.service';
@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthServiceService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    if (!this.authService.isAuthTokenPresent()) {
      // User is not authenticated, redirect to login page
      this.router.navigate(['/donorsignin']); // Adjust the route as necessary
      return false;
    }

    // User is authenticated, now check for role
    const expectedRole = route.data['expectedRole'];// The expected role defined in route data
    const userRole = this.authService.getUserRole();

    if (userRole === expectedRole) {
      // User has the expected role, allow access
      return true;
    } else {
      // User does not have the expected role, redirect to an unauthorized page or back to home
      this.router.navigate(['/']); // Adjust the route as necessary
      return false;
    }
  }
}
