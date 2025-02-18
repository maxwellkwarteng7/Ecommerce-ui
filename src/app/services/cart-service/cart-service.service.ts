import { Injectable, signal } from "@angular/core";
import { ToastrService } from "ngx-toastr";
import { Cart } from "../../models/templates";
import { BehaviorSubject } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class CartServiceService {
  cartCount = new BehaviorSubject<number>(this.cartValue()); 
  cartCount$ = this.cartCount.asObservable(); 

  constructor(private toaster: ToastrService) {
  
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

 

  
}
