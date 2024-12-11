import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'app-passcode',
  standalone: true,
  imports: [ CommonModule  , ReactiveFormsModule],
  templateUrl: './passcode.component.html',
  styleUrl: './passcode.component.scss'
})
export class PasscodeComponent implements OnInit {


  currentRoute!: string;  

  constructor(private router  : ActivatedRoute) {

  }

  ngOnInit(): void {
    this.currentRoute = this.router.snapshot.routeConfig?.path || ''; 
    console.log(this.currentRoute); 
  }

  forgotPasswordForm : FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email])
  });

  SixdigitPinForm: FormGroup = new FormGroup({
    one: new FormControl('', [Validators.required]),
    two: new FormControl('', [Validators.required]),
    three: new FormControl('', [Validators.required]),
    four: new FormControl('', [Validators.required]),
    five: new FormControl('', [Validators.required]),
    six: new FormControl('', [Validators.required]),
  });

  get forgotPasswordFields() {
    return this.forgotPasswordForm.controls; 
  }

  // function to handle the event to focus the input to the next and backspace to the previous

  autoFocus(e : any , previous : any , current:any , next : any) {
    const length = current.value.length; 
    const maxlength = current.getAttribute('maxlength'); 
    if (length == maxlength) {
      if (next !== "") {
        next.focus(); 
      } 
    }
    if (e.key === "Backspace") {
      if (previous !== "") {
        previous.focus(); 
      }
    }
  }

  // handle 6 digit 
  handleSixDigit() {
    const values = this.SixdigitPinForm.value; 
    // get all values as one into newValues variable 
    const newValues: string = `${values.one}${values.two}${values.three}${values.four}${values.five}${values.six}`; 
  
    // parse it and make it an integer
    const sixDigits = parseInt(newValues); 
    
  }

}
