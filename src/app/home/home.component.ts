import { Component, ElementRef, inject, OnInit, ViewChild} from '@angular/core';
import {  RouterOutlet } from '@angular/router';
import { NavbarComponent } from "../navbar/navbar.component";
import { ProductServiceService } from '../services/product-service/product-service.service';
import { Category , Product } from '../models/productTemplate';
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { TruncatePipe } from '../truncate.pipe';
import { Store } from '@ngrx/store';
import {  initializeCategoryLoad } from '../States/CategoryState/category.actions';
import { map, Observable } from 'rxjs';
import { AppState } from '../app.state';





@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent , CommonModule , TruncatePipe],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  @ViewChild('scrollContainer', { static: false }) scrollContainer!: ElementRef;
  currentYear: number = new Date().getFullYear();
  categories$!: Observable<Category[]>;  

  featuredProducts : Product[]= [];

  constructor(private productService: ProductServiceService, private toaster: ToastrService , private store : Store<AppState>) {
    this.categories$ = this.store.select((state) => state.category).pipe(map( ({categories})  => categories  || []));
  }


  ngOnInit(): void {
    this.store.dispatch(initializeCategoryLoad());
  }

  // get featured products
  getFeaturedProducts () {
    this.productService.getProductByTag('featured').subscribe({
      next : (data) => this.featuredProducts = data ,
      error : (error) => {
        this.toaster.error('error fetching featured products');
        console.log(error);    
    }
    });
  }

 
  handleScroll(type: string) {
    const container = this.scrollContainer.nativeElement;
    const scrollamount = 200;
    type && type === 'previous' ? container.scrollLeft -= scrollamount : container.scrollLeft += scrollamount;
  }

}
