import { Injectable, signal } from "@angular/core";
import { ToastrService } from "ngx-toastr";
import { Cart } from "../../models/templates";
import { BehaviorSubject } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { ProductServiceService } from "../product-service/product-service.service";

@Injectable({
  providedIn: "root",
})
export class CartServiceService {
  cartCount = new BehaviorSubject<number>(this.cartValue()); 
  cartCount$ = this.cartCount.asObservable(); 

  constructor(private toaster: ToastrService, private http: HttpClient, private productService: ProductServiceService) {
  
  }

  cartValue(): number {
    let cartContainer = []; 
    const cart = localStorage.getItem('userCart');
    if (cart) {
      cartContainer = JSON.parse(cart); 
    }
    return cartContainer.length;
  }

  addToCart(cartItem: Cart) {    
    const cart = JSON.parse(localStorage.getItem('userCart') || '[]'); 
      let  existingProduct: Cart = cart.find((item : Cart)=> item.id === cartItem.id);  
      if (existingProduct) {
        existingProduct.quantity = cartItem.quantity;  
      } else {
        cart.push(cartItem); 
      }
      localStorage.setItem('userCart', JSON.stringify(cart));
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
    };
    this.addToCart(cartItem);
  }

  removeFromCart(newItems : Cart[]) {
    localStorage.setItem('userCart', JSON.stringify(newItems)); 
    this.cartCount.next(newItems.length); 
  }

  getUserCart() {
    this.productService.getUserProductCart().subscribe({
      next: (data) => this.handleAuthenticateUserCart(data),
      error: () => this.toaster.error('error fetching user cart')
    });
  }

  handleAuthenticateUserCart(userCart: Cart[] | []) {
    let localCart : Cart[]  = JSON.parse(localStorage.getItem('userCart') || '[]') as Cart[];
    if (userCart.length > 0) {
      userCart.forEach((userItem : Cart)  => {
        let existingItem = localCart.find((localItem) => userItem.id === localItem.id);
        if (existingItem) {
          existingItem.quantity += userItem.quantity; 
        } else {
          localCart.push(userItem);
        }
      });
       
    } 
    localStorage.setItem('userCart', JSON.stringify(localCart));
    this.cartCount.next(localCart.length);
  }

 

 

  
}
