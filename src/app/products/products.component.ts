import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { NavbarComponent } from "../navbar/navbar.component";
import { ActivatedRoute, Router } from '@angular/router';
import { ProductServiceService } from '../services/product-service/product-service.service';
import { ToastrService } from 'ngx-toastr';
import { CartServiceService } from '../services/cart-service/cart-service.service';
import { Subscription } from 'rxjs';
import { Product, productsTemplate } from '../models/productTemplate';
import { CommonModule } from '@angular/common';
import { TruncatePipe } from '../truncate.pipe';


@Component({
  selector: 'app-products',
  standalone: true,
  imports: [NavbarComponent , CommonModule , TruncatePipe],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent implements OnInit , OnDestroy {

  type: string | null = null; 
  private querySub!: Subscription; 
  products!: productsTemplate;
  loading: boolean = true; 
  heading: string = ''; 
  currentPage: number = 1; 

  private activeRoute = inject(ActivatedRoute); 
  private productService = inject(ProductServiceService); 
  private toaster = inject(ToastrService);
  private cartService = inject(CartServiceService); 
  private router = inject(Router);

  

  ngOnInit(): void {
    this.querySub = this.activeRoute.queryParams.subscribe(params => {
      this.type = params['type'] || null; 
      if (this.type) {
        if (!isNaN(Number(this.type))) {
          this.getCategoryProducts(1);
          this.heading = "Category Products"; 
        } else {
          this.getTagProducts(1); 
          this.heading = this.type + ' Products';
        }
      } else {
        this.getAllProducts(1);
        this.heading = "Browse Products";
      }
    })
  }

  ngOnDestroy(): void {
    this.querySub.unsubscribe(); 
  }

  getCategoryProducts( page : number ) {
    if (this.type) {
      const categoryId = parseInt(this.type); 
      this.productService.getProductsByCategory(categoryId, page , 12).subscribe({
        next: (data) => {
          console.log(data);
          this.products = data
        },
        error: () => this.toaster.error('error fetching category products'), 
        complete: () => this.loading = false 
      });
    }
  }

  getTagProducts( page : number) {
    if (this.type) {
      this.productService.getProductByTag(this.type, page , 12).subscribe({
        next: (data) => {
          console.log(data); 
          this.products = data;
        }, 
        error : () => this.toaster.error('Error fetching tag products'), 
        complete: () => this.loading = false 
      })
    }
  }

  getAllProducts(page : number) {
    this.productService.getAllProducts(page, 6).subscribe({
      next: (data) => {
        console.log(data); 
        this.products = data;
      }, 
      error: () => this.toaster.error('Error fetching products'), 
      complete: () => this.loading = false 
    })
  }

   navigateToSingleProduct(id: number) {
      this.router.navigate(['product-detail', id]); 
    }
  
    addToCart(product: Product) {
      this.cartService.prepareAndAddToCart(product, 1); 
  }
  
  nextPage() {
    if (this.type) {
      if (!isNaN(Number(this.type))) {
        this.getCategoryProducts(this.products.currentPage + 1); 
      }else {
        this.getTagProducts(this.products.currentPage + 1 );
    } 
    } else {
    this.getAllProducts(this.products.currentPage + 1); 
    }
  }
   

  previousPage() {
    if (this.type) {
      if (!isNaN(Number(this.type))) {
        this.getCategoryProducts(this.products.currentPage - 1); 
      }else {
        this.getTagProducts(this.products.currentPage - 1 );
    } 
    } else {
    this.getAllProducts(this.products.currentPage - 1); 
    }
  }

}
