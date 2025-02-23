import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Category , Product, productsTemplate, reviewsTemplate } from '../../models/productTemplate';
import { environment } from '../../../environments/environment.development';
import { Observable } from 'rxjs';
import { setThrowInvalidWriteToSignalError } from '@angular/core/primitives/signals';


@Injectable({
  providedIn: 'root'
})
export class ProductServiceService {

  constructor(private http: HttpClient) { }

  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(`${environment.baseUrl}/category`);
  }

  getProductByTag(tag : string , page : number , limit : number) : Observable<productsTemplate>{
    return this.http.get<productsTemplate>(`${environment.baseUrl}/product/tag/products?tag=${tag}&page=${page}&limit=${limit}`);
  }

  getSingleProduct(id: number): Observable<Product>{
    return this.http.get<Product>(`${environment.baseUrl}/product/${id}`); 
  }

  getProductsByCategory(categoryId: number , page : number , limit : number): Observable<productsTemplate>{
    return this.http.get<productsTemplate>(`${environment.baseUrl}/category/${categoryId}?limit=${limit}&page=${page}`); 
  }

  getProductReviews(productId: number , page : number , limit : number): Observable<reviewsTemplate> {
    return this.http.get<reviewsTemplate>(`${environment.baseUrl}/reviews/${productId}?page=${page}&limit=${limit}`); 
  }

  getAllProducts(page: number, limit: number): Observable<productsTemplate>{
    return this.http.get<productsTemplate>(`${environment.baseUrl}/product?page=${page}&limit=${limit}`);
  }

 
}
