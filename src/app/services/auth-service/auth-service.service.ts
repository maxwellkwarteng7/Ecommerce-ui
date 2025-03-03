import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import {
  loginSuccessMessage,
  loginTemplate,
  registerTemplate,
  registrationSuccessMessage,
  userDetails,
} from "../../models/templates";
import { environment } from "../../../environments/environment.development";
import { Observable } from "rxjs";
import { CookieService } from "ngx-cookie-service";
import { Cart } from "../../models/templates";
import { CartServiceService } from "../cart-service/cart-service.service";

@Injectable({
  providedIn: "root",
})
export class AuthServiceService {
  constructor(private http: HttpClient, private cookie: CookieService , private cartService : CartServiceService) {}

  expirationDays: number = 1;
  // using this  2 variables in  forgot password and pin components 
 


  postRegistrationDetails(
    payload: registerTemplate
  ): Observable<registrationSuccessMessage> {
    return this.http.post<registrationSuccessMessage>(
      `${environment.baseUrl}/register`,
      payload
    );
  }

  postLoginDetails(payload: loginTemplate): Observable<loginSuccessMessage> {
    return this.http.post<loginSuccessMessage>(
      `${environment.baseUrl}/login`,
      payload
    );
  }

  storeToken(token: string) {
    this.cookie.set("token", token, {
      expires: new Date(
        new Date().getTime() + this.expirationDays * 24 * 60 * 60 * 1000
      ),
      path: "/",
      sameSite: "Strict",
      secure: true,
    });
  }

 isAuthenticated() {
   const token = this.cookie.get("token"); 
   if (token) {
     return true; 
   } else {
     return false;
   }
  }

  Logout() {
    let cartItems : Cart[] = JSON.parse(localStorage.getItem('userCart') || '[]'); 
    let guestCart = cartItems && cartItems.filter((item: Cart) => item.isAuthenticated !== true); 
    localStorage.setItem('userCart', JSON.stringify(guestCart));
    this.cartService.cartCount.next(guestCart.length); 
    this.cookie.delete("token"); 
  }

  //post pin
  postPin(payload: { pin: string, email: string, type: string } , url : string): Observable<string> {
    return this.http.post<string>(
      `${environment.baseUrl}/${url}`,
      payload
    );
  }
  
  initiateForgotPassword(email : string): Observable<string>{
    return this.http.post<string>(`${environment.baseUrl}/initiate-password-reset`, email);
  }
}
