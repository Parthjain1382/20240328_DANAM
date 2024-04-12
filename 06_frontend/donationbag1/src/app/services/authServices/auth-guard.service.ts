import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { AuthServiceService } from "./auth-service.service";
import { Injectable } from "@angular/core";
@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {
  isLoggedIn:boolean = false
    constructor(private authService:AuthServiceService,private router:Router){
        this.authService.loggedIn$.subscribe(loggedIn=>{
            this.isLoggedIn = loggedIn
        })
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
        if(this.isLoggedIn){
            return true
        }
        else{
            this.router.navigate(['/'])
            return false
        }
    }
}
