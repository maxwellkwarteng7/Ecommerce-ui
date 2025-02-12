import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Category } from '../../models/productTemplate';
import { environment } from '../../../environments/environment.development';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductServiceService {

  constructor(private http: HttpClient) { }
  
  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(`${environment.baseUrl}/category`);
  }
}
