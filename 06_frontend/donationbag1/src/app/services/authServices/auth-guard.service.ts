import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { AuthServiceService } from './auth-service.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(public authservice: AuthServiceService, public router: Router) { }

  /**
   * Checks if the user is authenticated before allowing access to a route.
   * If not authenticated, redirects the user to the Landing page.
   * @param route The route being activated.
   * @param state The current router state snapshot.
   * @returns True if the user is authenticated, false otherwise.
   */
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    let isAuth = this.authservice.getIsAuth();
    console.log('AuthGuard#canActivate called, isAuth:', isAuth); // Debugging line
    if (!isAuth) {
      this.router.navigate(['/login']); // Ensure this redirects to your login route
      return false;
    }
    return true;
  }
}
