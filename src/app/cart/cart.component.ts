import { Component, inject, Inject, OnInit } from '@angular/core';
import { NavbarComponent } from "../navbar/navbar.component";
import { FooterComponent } from "../footer/footer.component"; 
import { CommonModule, Location } from '@angular/common';
import { TruncatePipe } from '../truncate.pipe';
import { Product } from '../models/productTemplate';
import { Cart } from '../models/templates';
import { CartServiceService } from '../services/cart-service/cart-service.service';
import { AuthServiceService } from '../services/auth-service/auth-service.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [NavbarComponent, FooterComponent , TruncatePipe , CommonModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent implements OnInit {
 
  cartItems: Cart[] = []; 
  loading!: boolean; 
  subTotal: any = 0; 
  tax: number = 0; 
  isLoggedIn!: boolean; 
  cartCount!: number; 
  private location = inject(Location); 
  private cartService = inject(CartServiceService);
  private auth = inject(AuthServiceService); 
  private router = inject(Router); 
  private toaster = inject(ToastrService); 

  ngOnInit(): void {
    this.getLocalCartItems(); 
    this.getSubTotal(); 
    this.isLoggedIn = this.auth.isAuthenticated(); 
    this.cartService.cartCount$.subscribe((count) => this.cartCount = count); 
  }

  goBack() {
    this.location.back();
  }

  getLocalCartItems() {
    this.loading = true;
    this.cartItems = JSON.parse(localStorage.getItem('userCart') || '[]'); 
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

  proceedToCheckout() {
    this.loading = true; 
    console.log(this.cartItems);
    if (!this.isLoggedIn) this.router.navigate(['/login']);
    let cartItemsArray : {productId : number , quantity : number}[] = []; 
    this.cartItems.forEach(item => {
      const { id: productId, quantity } = item;
      let newItem = {
        productId,
        quantity
      }
      cartItemsArray.push(newItem);
    }); 
    this.cartService.postCartItems(cartItemsArray).subscribe({
      next: () => {
        this.router.navigate(['/shipping']);  
        this.loading = false; 
      }, 
      error: () => {
        this.toaster.error('Error checking out '); 
        this.loading = false; 
      }
    })
    
  }

}
