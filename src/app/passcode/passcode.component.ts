import { CommonModule } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from "@angular/forms";
import { Router } from "@angular/router";
import { AuthServiceService } from "../services/auth-service/auth-service.service";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-passcode",
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: "./passcode.component.html",
  styleUrl: "./passcode.component.scss",
})
export class PasscodeComponent implements OnInit{
  errorMessage: string = ''; 
  loading: boolean = false; 
  type: string = 'password'; 
  processingType!: string; 
  userEmail!: string;

  constructor(
    private router: Router,
    private auth: AuthServiceService,
    private toaster: ToastrService
  ) { }

  ngOnInit(): void {
    this.getEmailAndType();
  }
  

  getEmailAndType() {
    this.processingType = localStorage.getItem('type') || '';
    this.userEmail = localStorage.getItem('userEmail') || ''; 
  }

  // the 6 digit form
  SixdigitPinForm: FormGroup = new FormGroup({
    one: new FormControl("", [Validators.required]),
    two: new FormControl("", [Validators.required]),
    three: new FormControl("", [Validators.required]),
    four: new FormControl("", [Validators.required]),
    five: new FormControl("", [Validators.required]),
    six: new FormControl("", [Validators.required]),
  });

  PasswordForm: FormGroup = new FormGroup({
    password: new FormControl('', [Validators.required, Validators.minLength(8) , Validators.maxLength(128)]),
    confirmPassword: new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(128)]),
  }, {
      validators : this.confirmPasswordValidator()
  });
  

  
  get Fields() {
    return this.PasswordForm.controls; 
  }

  // function to handle the event to focus the input to the next and backspace to the previous

  autoFocus(e: any, previous: any, current: any, next: any) {
    const length = current.value.length; //get the length of the current value
    const maxlength = current.getAttribute("maxlength"); //get the maxlength value from the input field
    if (length == maxlength) {
      if (next !== "") {
        next.focus(); //focus on the next input field
      }
    }
    if (e.key === "Backspace") {
      if (previous !== "") {
        previous.focus(); // focus on the previous input field
      }
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
  
  togglePassword() {
    if (this.type === 'password') {
      this.type = 'text'; 
    } else {
      this.type = 'password'; 
    }
  }

  handlePin() {
    const values = this.SixdigitPinForm.value;
    // get all values as one into newValues variable
    const newValues = `${values.one}${values.two}${values.three}${values.four}${values.five}${values.six}`;
    return newValues; 
  }

  generatePayload() {
    this.loading = true; 
    const pin = this.handlePin(); 
    let payload : {email : string , pin : string , type : string , password : string } = {
      pin,
      type: this.processingType,
      email: this.userEmail,
      password: ''
    };
    return payload; 
  }
    

  // handle 6 digit
  handleEmailVerification() {
    const payload = this.generatePayload(); 
    console.log(payload); 
    this.auth.postPin(payload , payload.type).subscribe({
      next: () => {
        this.toaster.success('Email Verified , Login here'); 
        this.loading = false 
        this.router.navigate(['/login']); 
      }, 
      error: (err) => {
        this.errorMessage = err.error.error
        this.loading = false 
      }, 
    })
  }

  handleForgotPassword() {
    let  payload = this.generatePayload(); 
    let values = this.PasswordForm.value; 
    payload.password = values.password; 
    this.auth.postPin(payload , payload.type).subscribe({
      next: () => {
        this.loading = false; 
        this.toaster.success('Password Change Successful'); 
        this.router.navigate(['/login']); 
      }, 
      error: (err) => {
        this.loading = false; 
        this.errorMessage = err.error.error
      }
    })
    
  }
}
