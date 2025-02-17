import { Component, ElementRef, inject, OnInit, ViewChild} from '@angular/core';
import {  Router, RouterLink, RouterOutlet } from '@angular/router';
import { NavbarComponent } from "../navbar/navbar.component";
import { ProductServiceService } from '../services/product-service/product-service.service';
import { Category , Product } from '../models/productTemplate';
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { TruncatePipe } from '../truncate.pipe';
import { select, Store } from '@ngrx/store';
import {  initializeCategoryLoad } from '../States/CategoryState/category.actions';
import { map, Observable, tap } from 'rxjs';
import { AppState } from '../app.state';
import { initializeTagProductLoad } from '../States/TagProductState/tag.actions';
import { CartServiceService } from '../services/cart-service/cart-service.service';





@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent , CommonModule , TruncatePipe ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  @ViewChild('scrollContainer', { static: false }) scrollContainer!: ElementRef;
  currentYear: number = new Date().getFullYear();
  categories$!: Observable<Category[]>;  

  featuredProducts$!: Observable<Product[]>;

  constructor(private router :  Router, private store : Store<AppState> , private cartService : CartServiceService) {
    this.categories$ = this.store.select((state) => state.category).pipe(map(({ categories }) => categories || []));
    
    this.featuredProducts$ = this.store.select((state) => state.tagProducts).pipe(map( ({tagProducts}) => tagProducts || []));
  }


  ngOnInit(): void {
    this.store.dispatch(initializeCategoryLoad());
    this.store.dispatch(initializeTagProductLoad({ tag: 'featured' })); 
  }
 
  handleScroll(type: string) {
    const container = this.scrollContainer.nativeElement;
    const scrollamount = 300;
    type && type === 'previous' ? container.scrollLeft -= scrollamount : container.scrollLeft += scrollamount;
  }

  navigateToSingleProduct(id: number) {
    this.router.navigate(['product', id]); 
  }

  addToCart(product: Product) {
    this.cartService.prepareAndAddToCart(product, 1); 
  }

}
