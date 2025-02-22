import {
  Component,
  ElementRef,
  inject,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
  ViewChild,
} from "@angular/core";
import { ProductServiceService } from "../services/product-service/product-service.service";
import { productsTemplate , Product } from "../models/productTemplate";
import { ToastrService } from "ngx-toastr";
import { TruncatePipe } from "../truncate.pipe";
import { Router } from "@angular/router";
import { CartServiceService } from "../services/cart-service/cart-service.service";


@Component({
  selector: "app-related-products",
  standalone: true,
  imports: [TruncatePipe],
  templateUrl: "./related-products.component.html",
  styleUrl: "./related-products.component.scss",
})
export class RelatedProductsComponent implements OnChanges {
  @ViewChild("scrollContainer", { static: false }) scrollContainer!: ElementRef;

  @Input() categoryId!: number; 
  @Input() productId!: number; 
  relatedProducts!: Product[];
  loading: boolean = true; 

  productService = inject(ProductServiceService);
  toaster = inject(ToastrService); 
  router = inject(Router); 
  cartService = inject(CartServiceService); 


  ngOnChanges(changes: SimpleChanges): void {
    if (changes['categoryId'] || changes['productId']) {
      this.getRelatedProducts(); 
    }
  }


  getRelatedProducts() {
    if (this.categoryId && this.productId) {
      this.productService.getProductsByCategory(this.categoryId, 1, 12).subscribe({
        next: (data) => this.relatedProducts = data.products.filter((item) => item.id !== this.productId),
        error: (error) => this.toaster.error('Error fetching related products'),
        complete: () => this.loading = false
      });
    }
 }


  handleScroll(type: string) {
    const container = this.scrollContainer.nativeElement;
    const scrollamount = 310;
    type && type === "previous"
      ? (container.scrollLeft -= scrollamount)
      : (container.scrollLeft += scrollamount);
  }

  
  navigateToSingleProduct(id: number) {
      this.router.navigate(['product-detail', id]); 
    }
  
    addToCart(product: Product) {
      this.cartService.prepareAndAddToCart(product, 1); 
    }
}
