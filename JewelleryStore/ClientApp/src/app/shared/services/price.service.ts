import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "../../../environments/environment";
import { AuthService } from "./auth.service";

@Injectable()
export class PriceService{
    
    constructor(private http: HttpClient, private authService: AuthService){}

    public calculate(pricePerGram:number,weightInGram:number,discountInPercentage?:number): Observable<any>{        
        const currentUser = this.authService.currentUserValue;
        let headers = new HttpHeaders().set("Authorization", `bearer ${currentUser.token}`);
        return this.http.post<any>(`${environment.apiBaseUrl}${environment.priceUrl}`, {pricePerGram, weightInGram, discountInPercentage},{headers: headers}).pipe();
    }
}