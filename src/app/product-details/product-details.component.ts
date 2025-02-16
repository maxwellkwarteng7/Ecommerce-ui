import { Component, inject, OnInit } from '@angular/core';
import { NavbarComponent } from "../navbar/navbar.component";
import { ActivatedRoute } from '@angular/router';
import { ProductServiceService } from '../services/product-service/product-service.service';
import { ToastrService } from 'ngx-toastr';
import { singleProduct } from '../models/productTemplate';


@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [NavbarComponent],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.scss'
})
export class ProductDetailsComponent implements OnInit {

  singleProduct!: singleProduct;   
  
  private activeRoute = inject(ActivatedRoute); 
  private productService = inject(ProductServiceService); 
  private toaster = inject(ToastrService); 
  
  

  ngOnInit(): void {
    const id = this.activeRoute.snapshot.paramMap.get('id');
    let productId = null; 
    if (id) {
      productId = parseInt(id); 
      this.getSingleProduct(productId);
    }
  }

  getSingleProduct(productId : number) {
    this.productService.getSingleProduct(productId).subscribe({
      next: (data) => {
        console.log(data)
        this.singleProduct = data
      }, 
      error: (error) => {
        this.toaster.error('error fetching product details') 
        console.log(error);
      }
    })
  }

}
