import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  // paystack/initialize-payment
  constructor(private http: HttpClient , private cookie : CookieService) { }


  getHeaders(): HttpHeaders{
    const token = this.cookie.get('token'); 
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    }); 
  }

  initializePaystackPayment(): Observable<{ message: string, link: string }> {
    let body = ''; 
    return this.http.post<{message : string , link: string}>(`${environment.baseUrl}/paystack/initialize-payment`, body , {headers : this.getHeaders()}); 
  }

  



}
