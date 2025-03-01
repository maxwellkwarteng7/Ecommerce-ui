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

@Injectable({
  providedIn: "root",
})
export class AuthServiceService {
  constructor(private http: HttpClient, private cookie: CookieService) {}

  userDetails!: userDetails;
  expirationDays: number = 1;
  isLoggedIn: boolean = false ; 

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
    localStorage.removeItem('userCart'); 
    this.cookie.delete("token"); 
  }

  //post pin
  postPinInfo(payload: string): Observable<string> {
    return this.http.post<string>(
      `${environment.baseUrl}/verify-email`,
      payload
    );
   }
}
