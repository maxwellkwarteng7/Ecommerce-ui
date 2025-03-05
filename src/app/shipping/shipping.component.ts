import { Component } from '@angular/core';
import { NavbarComponent } from "../navbar/navbar.component";
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-shipping',
  standalone: true,
  imports: [NavbarComponent],
  templateUrl: './shipping.component.html',
  styleUrl: './shipping.component.scss'
})
export class ShippingComponent {
  isPaymentActive: boolean = false; 


  billingAddressForm: FormGroup = new FormGroup({
    fullName: new FormControl('', [Validators.required]),
    phone: new FormControl('', [Validators.required]),
    address1: new FormControl('', [Validators.required]),
    address2: new FormControl(''),
    country: new FormControl('', [Validators.required]),
    city: new FormControl('', [Validators.required]),
    state: new FormControl('', [Validators.required])
  }); 
}
