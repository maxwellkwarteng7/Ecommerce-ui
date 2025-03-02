import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormGroup , ReactiveFormsModule , Validators , FormControl } from '@angular/forms';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.scss'
})
export class ForgotPasswordComponent {

  forgotPasswordForm: FormGroup = new FormGroup({
    email: new FormControl("", [Validators.required, Validators.email]),
  });

  get forgotPasswordFields() {
    return this.forgotPasswordForm.controls;
  }

  handleForgotPassword() {
    const values = this.forgotPasswordForm.value; 
    

  }


}
