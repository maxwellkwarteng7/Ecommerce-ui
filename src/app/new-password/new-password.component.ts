import { CommonModule, Location } from '@angular/common';
import { Component, inject } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-new-password',
  standalone: true,
  imports: [ReactiveFormsModule , CommonModule],
  templateUrl: './new-password.component.html',
  styleUrl: './new-password.component.scss'
})
export class NewPasswordComponent {
  errorMessage: string = ''; 
  type: string = 'password'; 

  PasswordForm: FormGroup = new FormGroup({
    password: new FormControl('', [Validators.required, Validators.minLength(8)]),
    confirmPassword: new FormControl('', [Validators.required, Validators.minLength(8)]),
  }, {
      validators : this.confirmPasswordValidator()
    });

  get Fields() {
    return this.PasswordForm.controls; 
  }

  togglePassword() {
    if (this.type === 'password') {
      this.type = 'text'; 
    } else {
      this.type = 'password'; 
    }
  }

     confirmPasswordValidator(): ValidatorFn {
        return (control: AbstractControl): ValidationErrors | null => {
          if (control instanceof FormGroup) {
            const password = control.get('password')?.value; 
            const confirmPassword = control.get('confirmPassword')?.value; 
            // checking if the two of the passwords match 
            return password && confirmPassword && password !== confirmPassword ? { mismatch: true } : null;
            
          }
          return null; 
        }
  }
  
  handleNewPassword() {
    let values = this.PasswordForm.value; 
    delete values.confirmPassword; 
    console.log(values); 
  }
 
}
