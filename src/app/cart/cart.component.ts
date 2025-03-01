import { Component, inject, Inject, OnInit } from '@angular/core';
import { NavbarComponent } from "../navbar/navbar.component";
import { FooterComponent } from "../footer/footer.component"; 
import { CommonModule, Location } from '@angular/common';
import { TruncatePipe } from '../truncate.pipe';
import { Product } from '../models/productTemplate';
import { Cart } from '../models/templates';
import { CartServiceService } from '../services/cart-service/cart-service.service';
import { AuthServiceService } from '../services/auth-service/auth-service.service';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [NavbarComponent, FooterComponent , TruncatePipe , CommonModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent implements OnInit {
 
  cartItems: Cart[] = []; 
  loading: boolean = true; 
  subTotal: any = 0; 
  tax: number = 0; 
  isLoggedIn: boolean; 
  private location = inject(Location); 
  private cartService = inject(CartServiceService);
  private auth = inject(AuthServiceService); 

  constructor() {
    this.isLoggedIn = this.auth.isAuthenticated(); 
  }
  

  ngOnInit(): void {
    this.cartService.cartCount$.subscribe(() => {
      this.getLocalCartItems(); 
      this.getSubTotal();
    });
  }

  goBack() {
    this.location.back();
  }

  getLocalCartItems() {
    this.cartItems = this.isLoggedIn == true ? JSON.parse(localStorage.getItem('userCart') || '[]') : JSON.parse(localStorage.getItem('guestCart') || '[]'); 
    this.loading = false; 
  }

  getSubTotal() {
    if (this.cartItems.length > 0) {
      this.subTotal = this.cartItems.reduce((acc, item) => {
        let itemPrice = (item.discountPrice !== null ? item.discountPrice : item.price) * item.quantity;
        return itemPrice + acc; 
      }, 0); 
      this.subTotal = this.subTotal.toFixed(2);
    } else {
      this.subTotal = 0; 
    }
  }

  get TotalPrice() : number {
    return this.subTotal;
  }
  
  removeCartItem(cartId: number) {
    this.loading = true;
    const newItems = this.cartItems.filter((item) => item.id !== cartId); 
    this.cartService.removeFromCart(newItems); 
    this.getLocalCartItems(); 
    this.getSubTotal();
  }

  handleItemQuantity(item: Cart, type: string) {
    let productItem = this.cartItems.find((product) => product.id === item.id); 
    if (productItem) {
      type === 'increase' ? productItem.quantity++ : productItem.quantity--;
    } 
    this.cartService.saveCartToStorage(); // Update storage
    this.cartService.cartCount.next(this.cartItems.length); //  Update cart count
    this.getLocalCartItems(); 
    this.getSubTotal(); 
  }
  
  
   itemSubTotalPrice(price : number , quantity : number) {
    const newPrice = price * quantity; 
    return newPrice.toFixed(2);
  }

}
