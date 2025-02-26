import { Component, inject, Inject, OnInit } from '@angular/core';
import { NavbarComponent } from "../navbar/navbar.component";
import { FooterComponent } from "../footer/footer.component"; 
import { CommonModule, Location } from '@angular/common';
import { TruncatePipe } from '../truncate.pipe';
import { Product } from '../models/productTemplate';
import { Cart } from '../models/templates';
import { CartServiceService } from '../services/cart-service/cart-service.service';

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
  subTotal: number = 0; 
  tax: number = 0; 
  private location = inject(Location); 
  private cartService = inject(CartServiceService);

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
      this.subTotal = Math.round(this.subTotal);
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

  handleItemQuantity (item : Cart , type : string){
    //  find the item 
    let productItem = this.cartItems.find((product) => product.id === item.id); 
    if (productItem) {
      type == 'increase' ? productItem.quantity += 1 : productItem.quantity -= 1;
    } 
    localStorage.setItem('userCart', JSON.stringify(this.cartItems));
    this.getLocalCartItems(); 
    this.getSubTotal(); 
  }
  
   itemSubTotalPrice(price : number , quantity : number) {
    const newPrice = price * quantity; 
    return newPrice.toFixed(2);
  }

}
