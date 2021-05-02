import { Injectable } from "@angular/core";
import { CanLoad, Router, Route } from "@angular/router";
import { AuthService } from "../services/auth.service";

@Injectable()
export class AuthGuard implements CanLoad{
    constructor(private router: Router, private authService: AuthService){}

    canLoad(route:Route): boolean| Promise<boolean>{
        let url = `/${route.path}`;
        let currentUser = this.authService.currentUser;

        if(!currentUser){
            return this.router.navigate(['/login'], {queryParams: {returnUrl: url}});
        }
        return true;
    }
}