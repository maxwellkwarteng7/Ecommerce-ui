import { Injectable, signal } from "@angular/core";
import { ToastrService } from "ngx-toastr";
import { Cart } from "../../models/templates";

@Injectable({
  providedIn: "root",
})
export class CartServiceService {
  userCart: Cart[] = [];
  cartCount = signal<number>(0);
  constructor(private toaster: ToastrService) {
    this.getCartCount(); 
  }

  addToCart(cartItem: Cart) {
    const Product = this.userCart.find((cart) => cart.id === cartItem.id);
    if (Product) {
      Product.quantity = cartItem.quantity;
    } else {
      this.userCart = [...this.userCart, cartItem];
    }
    this.saveCartToLocalStorage(); 
    this.getCartCount(); 
    this.toaster.success("Added to Cart");
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

  saveCartToLocalStorage() {
    localStorage.setItem('userCart', JSON.stringify(this.userCart)); 
  }

  getCartCount() {
    const cart = localStorage.getItem('userCart'); 
    if (cart) {
      const cartItems = JSON.parse(cart);
      console.log(cartItems); 
      this.cartCount.set(cartItems.length);
      console.log("this is it " , this.cartCount()); 
    }
  }
}
