import { Injectable } from "@angular/core";
import { ToastrService } from "ngx-toastr";
import { Cart } from "../../models/templates";

@Injectable({
  providedIn: "root",
})
export class CartServiceService {
  userCart: Cart[] = [];
  constructor(private toaster: ToastrService) {}

  addToCart(cartItem: Cart) {
    const Product = this.userCart.find((cart) => cart.id === cartItem.id);
    if (Product) {
      Product.quantity = cartItem.quantity;
    } else {
      this.userCart = [...this.userCart, cartItem];
    }
    console.log("userCart", this.userCart);
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
}
