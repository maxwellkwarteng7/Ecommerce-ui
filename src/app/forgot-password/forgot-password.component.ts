import { CommonModule, Location } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormGroup , ReactiveFormsModule , Validators , FormControl } from '@angular/forms';
import { AuthServiceService } from '../services/auth-service/auth-service.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.scss'
})
export class ForgotPasswordComponent {

  auth = inject(AuthServiceService); 
  router = inject(Router); 
  toaster = inject(ToastrService); 
  location = inject(Location); 

  errorMessage: string = ''; 

  forgotPasswordForm: FormGroup = new FormGroup({
    email: new FormControl("", [Validators.required, Validators.email]),
  });

  handleGoBack() {
    this.location.back();
  }


  get forgotPasswordFields() {
    return this.forgotPasswordForm.controls;
  }

  handleForgotPassword() {
    const values = this.forgotPasswordForm.value; 
    console.log(values); 
    this.auth.initiateForgotPassword(values).subscribe({
      next: () => {
        this.auth.userEmail = values.email;
        this.auth.type = 'forgot-password';
        this.router.navigate(['/pin-verification']);
      },
      error: (err) => {
        this.errorMessage = err.error.error
      }
    }); 
  }


}
