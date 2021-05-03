import { Injectable } from "@angular/core";
import { Router, Route, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { AuthService } from "../services/auth.service";

@Injectable()
export class AuthGuard implements CanActivate{
    constructor(private router: Router, private authService: AuthService){}

    canActivate(routeSnapshot: ActivatedRouteSnapshot,routeState: RouterStateSnapshot): boolean | Promise<boolean> {        
        const currentUser = this.authService.currentUserValue;

        if(!currentUser){
            return this.router.navigate(['/login'], {queryParams: {returnUrl: routeState.url}});
        }

        return true;
    }
}