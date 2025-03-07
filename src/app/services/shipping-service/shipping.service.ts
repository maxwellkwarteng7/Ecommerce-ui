import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { environment } from '../../../environments/environment.development';
import { Address } from '../../models/templates';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShippingService {

  constructor(private http: HttpClient, private cookie: CookieService) { }
  
  // get the headers 
  getHeaders(): HttpHeaders {
    const token = this.cookie.get('token'); 
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    }); 
  }

  postUserAddress(payload : Address): Observable<string> {
    return this.http.post<string>(`${environment.baseUrl}/shipping`, payload, { headers: this.getHeaders() }); 
  }

}
