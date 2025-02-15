import { CommonModule } from '@angular/common';
import { Component  , inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { AuthServiceService } from '../../services/auth-service/auth-service.service';
import { loginSuccessMessage, loginTemplate } from '../../models/templates';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink , ReactiveFormsModule , CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {
  type: string = 'password';
  loading: boolean = false; 
  loginErrorMessage: string = ''; 
  userDetails!: loginSuccessMessage; 
  

  loginForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.email , Validators.required]) , 
    password: new FormControl('', [Validators.required])
  });

  // injecting the auth service 
  auth = inject(AuthServiceService); 
 

  ngOnInit(): void { 
    
  }
   
 

  togglePassword() {
    if (this.type === 'password') {
      this.type = 'text'; 
    } else {
      this.type = 'password'; 
    }
  }

  // post the login details 
 


  get Fields() {
    return this.loginForm.controls; 
  }

  // reset form 
  resetForm(email : string ) {
    return this.loginForm.reset({
      email 
    })
  }

  submitLoginForm() {
    this.loading = true; 
    const loginDetails : loginTemplate  = this.loginForm.value; 
    console.log(loginDetails); 
    this.auth.postLoginDetails(loginDetails).subscribe((res) => {
      this.auth.storeToken(res.message.token); 
      this.loading = false;  
    }, (error) => {
      this.loginErrorMessage = error.error.error; 
      this.resetForm(loginDetails.email); 
      this.loading = false; 
    }); 
  }

}
