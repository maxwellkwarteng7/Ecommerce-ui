import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { loginTemplate, registerTemplate } from '../../models/templates';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  constructor(private http: HttpClient) { }
  
  
  postRegistrationDetails( payload : registerTemplate) {
   return  this.http.post(`${environment.baseUrl}/register`, payload); 
  }

  postLoginDetails( payload : loginTemplate) {
    return  this.http.post(`${environment.baseUrl}/login`, payload); 
  }


}
