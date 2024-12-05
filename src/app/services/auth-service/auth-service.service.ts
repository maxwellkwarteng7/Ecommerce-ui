import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { loginSuccessMessage, loginTemplate, registerTemplate, registrationSuccessMessage } from '../../models/templates';
import { environment } from '../../../environments/environment.development';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {
  constructor(private http: HttpClient) { }
  
  
  postRegistrationDetails( payload : registerTemplate) : Observable<registrationSuccessMessage> {
   return  this.http.post<registrationSuccessMessage>(`${environment.baseUrl}/register`, payload); 
  }

  postLoginDetails( payload : loginTemplate) : Observable<loginSuccessMessage>  {
    return  this.http.post<loginSuccessMessage>(`${environment.baseUrl}/login`, payload); 
  }


  




}
