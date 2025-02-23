import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { NavbarComponent } from "../navbar/navbar.component";
import { ActivatedRoute, Router } from '@angular/router';
import { ProductServiceService } from '../services/product-service/product-service.service';
import { ToastrService } from 'ngx-toastr';
import { CartServiceService } from '../services/cart-service/cart-service.service';
import { Subscription } from 'rxjs';
import { productsTemplate } from '../models/productTemplate';
import { NgControlStatusGroup } from '@angular/forms';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [NavbarComponent],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent implements OnInit , OnDestroy {

  type: string | null = null; 
  private querySub!: Subscription; 
  products!: productsTemplate;
  loading: boolean = true; 

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
          this.getCategoryProducts(); 
        } else {
          this.getTagProducts();  
        }
      } else {
        this.getAllProducts(); 
      }
    })
  }

  ngOnDestroy(): void {
    this.querySub.unsubscribe(); 
  }

  getCategoryProducts() {
    if (this.type) {
      const categoryId = parseInt(this.type); 
      this.productService.getProductsByCategory(categoryId, 1, 12).subscribe({
        next: (data) => {
          console.log(data);
          this.products = data
        },
        error: () => this.toaster.error('error fetching category products'), 
        complete: () => this.loading = false 
      });
    }
  }

  getTagProducts() {
    if (this.type) {
      this.productService.getProductByTag(this.type, 1, 12).subscribe({
        next: (data) => {
          console.log(data); 
          this.products = data;
        }, 
        error : () => this.toaster.error('Error fetching tag products'), 
        complete: () => this.loading = false 
      })
    }
  }

  getAllProducts() {
    this.productService.getAllProducts(1, 12).subscribe({
      next: (data) => {
        console.log(data); 
        this.products = data;
      }, 
      error: () => this.toaster.error('Error fetching products'), 
      complete: () => this.loading = false 
    })
  }

}
