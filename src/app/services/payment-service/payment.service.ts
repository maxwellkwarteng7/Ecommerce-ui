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

  initiatePayment(paymentMethod : string): Observable<{ message: string, link: string }> {
    const body = ''; 
    return this.http.post<{message : string , link: string}>(`${environment.baseUrl}/${paymentMethod}/initiate-payment`, body , {headers : this.getHeaders()}); 
  }

  verifyPaystackPayment(reference: string, addressId: number): Observable<string> {
    const payload = {
      addressId
    }
    return this.http.post<string>(`${environment.baseUrl}/paystack/verify-payment/${reference}` , payload, {headers : this.getHeaders()}); 
  }
  
  verifyStripePayment(sessionId: string, addressId: number): Observable<string> {
    return this.http.get<string>(`${environment.baseUrl}/stripe/verify-payment/${sessionId}`); 
  }
  



}
