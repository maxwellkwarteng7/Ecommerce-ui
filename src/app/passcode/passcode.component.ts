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

  constructor(
    private router: Router,
    private auth: AuthServiceService,
    private toaster: ToastrService
  ) { }

  ngOnInit(): void {
    this.getType();
  }
  

  getType() {
     this.processingType = localStorage.getItem('type') || ''; 
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
    password: new FormControl('', [Validators.required, Validators.minLength(8)]),
    confirmPassword: new FormControl('', [Validators.required, Validators.minLength(8)]),
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
    

  // handle 6 digit
  handleSixDigit() {
    this.loading = true; 
    const values = this.SixdigitPinForm.value;
    console.log(values);
    // get all values as one into newValues variable
    const newValues = `${values.one}${values.two}${values.three}${values.four}${values.five}${values.six}`;

    let payload: { email: string; pin: string ; type: string } = {
      pin: newValues,
      type: '',
      email: '',
    };
    //  now that you have the payload make the api request 
    

  }
}
