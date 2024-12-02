import { CommonModule } from '@angular/common';
import { Component  , OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink , ReactiveFormsModule , CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {
  type: string = 'password';

  loginForm: FormGroup = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', [Validators.required, Validators.minLength(8)])
  });

  ngOnInit(): void { 
    console.log(this.loginForm.controls)
  }
   
 

  togglePassword() {
    if (this.type === 'password') {
      this.type = 'text'; 
    } else {
      this.type = 'password'; 
    }
  }


  get Fields() {
    return this.loginForm.controls; 
  }

  submitLoginForm() {
    const values  = this.loginForm.value; 
    console.log(values); 
  }

}
