import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { orderDetail, Orders, orderTemplate } from '../../models/templates';
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
  
  getOrders(): Observable<orderTemplate> {
    return this.http.get<orderTemplate>(`${environment.baseUrl}/orders`, { headers: this.getHeaders() }); 
  }

  getOrderItems(orderId : number , page : number , limit : number): Observable<orderDetail> {
    return this.http.get<orderDetail>(`${environment.baseUrl}/orders/${orderId}?page=${page}&limit=${limit}`, { headers: this.getHeaders() });
  }
}
