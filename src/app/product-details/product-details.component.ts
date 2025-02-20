import { Component, inject, OnInit , ViewChild , ElementRef } from "@angular/core";
import { NavbarComponent } from "../navbar/navbar.component";
import { ActivatedRoute, Router, RouterLink } from "@angular/router";
import { ProductServiceService } from "../services/product-service/product-service.service";
import { ToastrService } from "ngx-toastr";
import { Product } from "../models/productTemplate";
import { CommonModule } from "@angular/common";
import { Cart } from "../models/templates";
import { CartServiceService } from "../services/cart-service/cart-service.service";
import { FooterComponent } from "../footer/footer.component";

@Component({
  selector: "app-product-details",
  standalone: true,
  imports: [NavbarComponent, CommonModule, RouterLink, FooterComponent],
  templateUrl: "./product-details.component.html",
  styleUrl: "./product-details.component.scss",
})
export class ProductDetailsComponent implements OnInit {
  singleProduct!: Product;
  quantity: number = 1;
  @ViewChild('scrollContainer', { static: false }) scrollContainer!: ElementRef;

  private activeRoute = inject(ActivatedRoute);
  private productService = inject(ProductServiceService);
  private toaster = inject(ToastrService);
  private cartService = inject(CartServiceService);
  private  router = inject(Router);

  ngOnInit(): void {
    const id = this.activeRoute.snapshot.paramMap.get("id");
    let productId = null;
    if (id) {
      productId = parseInt(id);
      this.getSingleProduct(productId);
    }
  }

  getSingleProduct(productId: number) {
    this.productService.getSingleProduct(productId).subscribe({
      next: (data) => {
        console.log(data);
        this.singleProduct = data;
      },
      error: (error) => {
        this.toaster.error("error fetching product details");
        console.log(error);
      },
    });
  }

  decreaseQuantity() {
    if (this.quantity > 1) {
      this.quantity -= 1;
    }
  }

  increaseQuantity() {
    if (this.quantity < this.singleProduct.stock) {
      this.quantity += 1;
    }
  }

  addItemToCart(product: Product) {
    this.cartService.prepareAndAddToCart(product, this.quantity);
  }

  handleScroll(type: string) {
    const container = this.scrollContainer.nativeElement;
    const scrollamount = 310;
    type && type === 'previous' ? container.scrollLeft -= scrollamount : container.scrollLeft += scrollamount;
  }

  addToCart(product: Product) {
    this.cartService.prepareAndAddToCart(product, 1); 
  }

  navigateToSingleProduct(id: number) {
    this.router.navigate(['product', id]); 
  }
 
}
