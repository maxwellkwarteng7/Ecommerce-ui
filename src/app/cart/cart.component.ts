import { Component, inject, Inject, OnInit } from '@angular/core';
import { NavbarComponent } from "../navbar/navbar.component";
import { FooterComponent } from "../footer/footer.component"; 
import { Location } from '@angular/common';
import { TruncatePipe } from '../truncate.pipe';
import { Product } from '../models/productTemplate';
import { Cart } from '../models/templates';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [NavbarComponent, FooterComponent , TruncatePipe],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent implements OnInit {
 
  cartItems: Cart[] = []; 
  loading: boolean = true; 
  subTotal: number = 0; 
  tax: number = 20; 
  private location = inject(Location); 

  ngOnInit(): void {
    this.getLocalCartItems(); 
    this.getSubTotal(); 
  }

  goBack() {
    this.location.back();
  }

  getLocalCartItems() {
    this.cartItems = JSON.parse(localStorage.getItem('userCart') || '[]'); 
    this.loading = false; 
  }

  getSubTotal() {
    if (this.cartItems.length > 0) {
      this.subTotal = this.cartItems.reduce((acc, item) => {
        let itemPrice = (item.discountPrice !== null ? item.discountPrice : item.price) * item.quantity;
        return itemPrice + acc; 
      }, 0); 
      this.subTotal = Math.ceil(this.subTotal); 
    }
  }

  get TotalPrice() : number {
    return this.subTotal + this.tax;
  }
  
  removeCartItem(cartId: number) {
    this.loading = true;
    const newItems = this.cartItems.filter((item) => item.id !== cartId); 
    localStorage.setItem('userCart', JSON.stringify(newItems)); 
    this.getLocalCartItems(); 
    this.getSubTotal();
  }
}
