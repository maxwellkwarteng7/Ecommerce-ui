import { AfterViewInit, Component, inject, OnInit } from '@angular/core';
import { NavbarComponent } from "../navbar/navbar.component";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Address, Cart } from '../models/templates';
import { PaymentService } from '../services/payment-service/payment.service';
import { ToastrService } from 'ngx-toastr';
import { ShippingService } from '../services/shipping-service/shipping.service';

@Component({
  selector: 'app-shipping',
  standalone: true,
  imports: [NavbarComponent , ReactiveFormsModule , CommonModule],
  templateUrl: './shipping.component.html',
  styleUrl: './shipping.component.scss'
})
export class ShippingComponent implements OnInit  {
  isPaymentActive: boolean = false; 
  cartItems: Cart[] = [];
  total: any; 
  itemsCount!: number;
  paymentLink: string = ''; 

  loaders = {
    checkoutLoader: false, 
    addressLoader : false 
  }

  // all injections here
  paymentService = inject(PaymentService); 
  toaster = inject(ToastrService); 
  shippingService = inject(ShippingService); 


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
    this.loaders.checkoutLoader = true; 
    this.paymentService.initializePaystackPayment().subscribe({
      next: (data) => {
        this.paymentLink = data.link
        window.open(this.paymentLink, '_blank'); 
        this.loaders.checkoutLoader = false; 
      },
      error: (error) => {
        console.log(error);
        this.toaster.error('Error fetching payment link');
        this.loaders.checkoutLoader = false;
      }
    });
  }

  handlePay() {
    this.getPaystackLink();
  }

  handleAddress() {
    this.loaders.addressLoader = true; 
    const addressInfo: Address = this.billingAddressForm.value; 
    console.log('this is working'); 
    this.shippingService.postUserAddress(addressInfo).subscribe({
      next: () => {
        this.loaders.addressLoader = false;
        this.toaster.success('Address Saved !');
      }, 
      error: (error) => {
        this.loaders.addressLoader = false;
        console.log(error); 
        this.toaster.error('Error saving Address');
      }
    })
    
  }

 
}
