import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "../../../environments/environment";
import { AuthService } from "./auth.service";

@Injectable()
export class PriceService{
    
    constructor(private http: HttpClient, private authService: AuthService){}

    public calculate(price:number,weight:number,discount?:number): Observable<any>{
        debugger;
        const currentUser = this.authService.currentUserValue;
        let headers = new HttpHeaders({"Authorization":`bearer ${currentUser.token}`});
        return this.http.post<any>(`${environment.apiBaseUrl}${environment.priceUrl}`, {price, weight, discount},{headers: headers}).pipe();
    }
}