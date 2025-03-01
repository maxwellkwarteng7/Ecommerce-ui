import { Injectable, OnInit, signal } from "@angular/core";
import { ToastrService } from "ngx-toastr";
import { Cart } from "../../models/templates";
import { BehaviorSubject } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { ProductServiceService } from "../product-service/product-service.service";
import { AuthServiceService } from "../auth-service/auth-service.service";

@Injectable({
  providedIn: "root",
})
export class CartServiceService implements OnInit {
  cartCount = new BehaviorSubject<number>(this.cartValue); 
  cartCount$ = this.cartCount.asObservable(); 
  isLoggedIn: boolean; 
  cart: Cart[] = []; 

  constructor(private toaster: ToastrService, private http: HttpClient, private productService: ProductServiceService, private auth: AuthServiceService) {
    this.isLoggedIn = this.auth.isAuthenticated(); 
    this.cart = this.getStoredCart();
    this.cartCount.next(this.cart.length); // Update cart count on initialization
  }

  ngOnInit(): void {
   
  }


 get  cartValue() : number{
    let cartContainer = []; 
    const cart = this.isLoggedIn ? localStorage.getItem('userCart') : localStorage.getItem('guestCart');
    if (cart) {
      cartContainer = JSON.parse(cart); 
    }
    return cartContainer.length
  }

  saveCartToStorage() {
    const storageKey = this.isLoggedIn ? 'userCart' : 'guestCart';
    localStorage.setItem(storageKey, JSON.stringify(this.cart));
  }

  getStoredCart(): Cart[] {
    const cart = this.isLoggedIn ? localStorage.getItem('userCart') : localStorage.getItem('guestCart');
    return cart ? JSON.parse(cart) : [];
  }


 addToCart(cartItem: Cart) {    
  this.cart = this.getStoredCart();
  let existingProduct = this.cart.find((item: Cart) => item.id === cartItem.id);  

  if (existingProduct) {
    existingProduct.quantity = cartItem.quantity;  
  } else {
    this.cart.push(cartItem); 
  }

  this.saveCartToStorage(); // ✅ Ensure storage is updated before updating cart count
  this.cartCount.next(this.cart.length); 
  this.toaster.success('Added to cart'); 
}


  prepareAndAddToCart(product: any, quantity: number) {
    const { id, name, image, price, discountPrice, stock } = product;
    let cartItem = {
      id,
      name,
      image,
      price,
      discountPrice,
      stock,
      quantity,
      isAuthenticated : false 
    };
    this.addToCart(cartItem);
  }

  removeFromCart(newItems : Cart[]) {
    if (this.isLoggedIn) {
      localStorage.setItem('userCart', JSON.stringify(newItems)); 
    } else {
      localStorage.setItem('guestCart', JSON.stringify(newItems)); 
    }
    this.cartCount.next(newItems.length); 
  }

  getUserCart() {
    this.productService.getUserProductCart().subscribe({
      next: (data) => this.handleAuthenticateUserCart(data),
      error: () => this.toaster.error('error fetching user cart')
    });
  }

  handleAuthenticateUserCart(userCart: Cart[]) {
    let localCart : Cart[]  = JSON.parse(localStorage.getItem('guestCart') || '[]') as Cart[];
    if (userCart.length > 0) {
      userCart.forEach((userItem : Cart)  => {
        let existingItem = localCart.find((localItem) => userItem.id === localItem.id);
        if (existingItem) {
          existingItem.quantity = userItem.quantity;
          existingItem.isAuthenticated = userItem.isAuthenticated;
        } else {
          localCart.push(userItem);
        }
      });
       
    } 
    localStorage.setItem('userCart', JSON.stringify(localCart));
    this.cartCount.next(localCart.length); 
  }


 

 

  
}
