import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [RouterLink ,ReactiveFormsModule , CommonModule ],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.scss'
})
export class SignUpComponent implements OnInit {

  type: string = 'password'; 

  registerForm: FormGroup = new FormGroup({
    username: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required , Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(8)]),
    confirmPassword: new FormControl('', [Validators.required, Validators.minLength(8)]),
  }, {
      validators : this.confirmPasswordValidator()
  });

  ngOnInit(): void {
   
  }

    // the password validator function 
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


  // getting the controls of this form 
  get Fields() {
    return this.registerForm.controls; 
  }

  // toggle the type of input for password 
  togglePassword() {
    if (this.type === 'password') {
      this.type = 'text'; 
    } else {
      this.type = 'password'; 
    }
  }


  submitRegisterForm() {
    const body = this.registerForm.value; 
    delete body.confirmPassword; 
    console.log(body); 
  }


}
