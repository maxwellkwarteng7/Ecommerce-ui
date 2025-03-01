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
  cartCount = new BehaviorSubject<number>(this.cartValue()); 
  cartCount$ = this.cartCount.asObservable(); 
  isLoggedIn!: boolean; 

  constructor(private toaster: ToastrService, private http: HttpClient, private productService: ProductServiceService, private auth : AuthServiceService) {
    this.isLoggedIn = this.auth.isLoggedIn; 
  }

  ngOnInit(): void {
   
  }

  updateCartCount() {
    this.cartCount.next(this.cartValue()); 
  }

  cartValue(): number {
    let cartContainer = []; 
    const cart = this.isLoggedIn ? localStorage.getItem('userCart') : localStorage.getItem('guestCart');
    if (cart) {
      cartContainer = JSON.parse(cart); 
    }
    return cartContainer.length;
  }

  addToCart(cartItem: Cart) {    
    const cart = this.isLoggedIn ? JSON.parse(localStorage.getItem('userCart') || '[]') : JSON.parse(localStorage.getItem('guestCart') || '[]');
      let  existingProduct: Cart = cart.find((item : Cart)=> item.id === cartItem.id);  
      if (existingProduct) {
        existingProduct.quantity = cartItem.quantity;  
      } else {
        cart.push(cartItem); 
      }
    if (this.isLoggedIn) {
      localStorage.setItem('userCart', JSON.stringify(cart));
    } else {
      localStorage.setItem('guestCart', JSON.stringify(cart));
      }
      this.cartCount.next(cart.length); 
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
    console.log(userCart); 
    let localCart : Cart[]  = JSON.parse(localStorage.getItem('guestCart') || '[]') as Cart[];
    if (userCart.length > 0) {
      userCart.forEach((userItem : Cart)  => {
        let existingItem = localCart.find((localItem) => userItem.id === localItem.id);
        if (existingItem) {
          existingItem.quantity += userItem.quantity;
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
