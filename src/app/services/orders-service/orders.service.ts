import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Orders } from '../../models/templates';
import { environment } from '../../../environments/environment.development';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  constructor(private http: HttpClient , private cookie : CookieService) { }

  getHeaders(): HttpHeaders {
    const token = this.cookie.get('token'); 
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    }); 
  }
  
  getOrders(): Observable<Orders> {
    return this.http.get<Orders>(`${environment.baseUrl}/orders` , )
  }
}
