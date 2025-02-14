import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Category , Product } from '../../models/productTemplate';
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

  getProductByTag(tag : string) : Observable<Product[]>{
    return this.http.get<Product[]>(`${baseUrl}/tag/products?tag=${tag}`);
  }
}
