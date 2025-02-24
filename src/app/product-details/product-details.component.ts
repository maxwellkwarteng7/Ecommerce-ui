import { Component, inject, OnInit , ViewChild , ElementRef, AfterViewInit, OnDestroy } from "@angular/core";
import { NavbarComponent } from "../navbar/navbar.component";
import { ActivatedRoute, Router, RouterLink } from "@angular/router";
import { ProductServiceService } from "../services/product-service/product-service.service";
import { ToastrService } from "ngx-toastr";
import { Product, reviewsTemplate } from "../models/productTemplate";
import { CommonModule } from "@angular/common";
import { Cart } from "../models/templates";
import { CartServiceService } from "../services/cart-service/cart-service.service";
import { FooterComponent } from "../footer/footer.component";
import { StarRatingComponent } from "../star-rating/star-rating.component";
import { RelatedProductsComponent } from "../related-products/related-products.component";
import { Subscription } from "rxjs";

@Component({
  selector: "app-product-details",
  standalone: true,
  imports: [NavbarComponent, CommonModule, RouterLink, FooterComponent, StarRatingComponent, RelatedProductsComponent],
  templateUrl: "./product-details.component.html",
  styleUrl: "./product-details.component.scss",
})
export class ProductDetailsComponent implements OnInit , OnDestroy  {
  singleProduct!: Product;
  quantity: number = 1;
 
  userReview!: reviewsTemplate; 
  page: number = 1; 
  
  loading: { product: boolean, image: boolean, reviews: boolean } = {
    product: true  ,  
    image: true, 
    reviews : true
  }
  private routeSub!: Subscription; 

  private activeRoute = inject(ActivatedRoute);
  private productService = inject(ProductServiceService);
  private toaster = inject(ToastrService);
  private cartService = inject(CartServiceService);
  private router = inject(Router);

  ngOnInit(): void {
    this.routeSub = this.activeRoute.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        const productId = parseInt(id);
        this.getSingleProduct(productId);
      }
    }); 
  }

  ngOnDestroy(): void {
    this.routeSub.unsubscribe(); 
  }

 


  getSingleProduct(productId: number) {
    this.productService.getSingleProduct(productId).subscribe({
      next: (data) => {
        this.singleProduct = data 
        this.getProductReviews(this.page); 
      },  
      error: (error) => {
        this.toaster.error("error fetching product details");
        console.log(error);
      },
      complete: () => this.loading.product = false 
    });
  }


  getProductReviews(page: number) {
    console.log(page); 
    if (this.singleProduct) {
      this.productService.getProductReviews(this.singleProduct.id , page , 8).subscribe({
        next: (data) => {
          this.userReview = data
        },
        error: (error) => {
          this.toaster.error('Error fetching product reviews');
          console.log(error); 
        }, 
        complete: () => this.loading.reviews = false 
      })
    }
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


  addToCart(product: Product) {
    this.cartService.prepareAndAddToCart(product, 1); 
  }

  navigateToSingleProduct(id: number) {
    this.router.navigate(['product', id]); 
  }

  get averageRating() { 
    let average = 0; 
    if (this.userReview) {
      let reviews = this.userReview.reviews;
      for (let i = 0; i < reviews.length; i++){
        average += reviews[i].rating; 
      }
      average = average / reviews.length; 
    }
    return average;  
  }

  nextPage() {
    this.getProductReviews(this.page + 1); 
  }

  previousPage() {
    if (this.page > 1) {
      this.getProductReviews(this.page - 1);
      }
  }
  

 
}
