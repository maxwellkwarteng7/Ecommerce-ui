import { AfterViewInit, Component, inject, OnInit } from '@angular/core';
import { NavbarComponent } from "../navbar/navbar.component";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Cart } from '../models/templates';
import { PaymentService } from '../services/payment-service/payment.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-shipping',
  standalone: true,
  imports: [NavbarComponent , ReactiveFormsModule , CommonModule],
  templateUrl: './shipping.component.html',
  styleUrl: './shipping.component.scss'
})
export class ShippingComponent implements OnInit  {
  isPaymentActive: boolean = false; 
  loading: boolean = false; 
  cartItems: Cart[] = [];
  total: any; 
  itemsCount!: number;
  paymentLink: string = ''; 

  // all injections here
  paymentService = inject(PaymentService); 
  toaster = inject(ToastrService); 


  ngOnInit(): void {
    this.cartItems = JSON.parse(localStorage.getItem('userCart') || '[]'); 
    this.itemsCount = this.cartItems.length;
  }



  billingAddressForm: FormGroup = new FormGroup({
    fullName: new FormControl('', [Validators.required]),
    phone: new FormControl('', [Validators.required]),
    address1: new FormControl('', [Validators.required]),
    address2: new FormControl(''),
    country: new FormControl('', [Validators.required]),
    city: new FormControl('', [Validators.required]),
    state: new FormControl('', [Validators.required])
  }); 

  get Fields() {
    return this.billingAddressForm.controls; 
  }

  getSubtotal() {
    let total = this.cartItems.reduce((acc, item) => {
      let itemPrice = item.discountPrice !== null ? item.discountPrice : item.price;
      return itemPrice * item.quantity + acc;
    }, 0); 
    this.total = total.toFixed(2); 
    return this.total;
  }


  getPaystackLink() {
    this.paymentService.initializePaystackPayment().subscribe({
      next: (data) => {
        this.paymentLink = data.link
        window.open(this.paymentLink, '_blank'); 
      },
      error: (error) => {
        console.log(error);
        this.toaster.error('Error fetching payment link');
      }
    });
  }

  handlePay() {
    this.getPaystackLink();
  }

 
}
