import { Component, ElementRef, inject, OnInit, ViewChild} from '@angular/core';
import {  RouterOutlet } from '@angular/router';
import { NavbarComponent } from "../navbar/navbar.component";
import { ProductServiceService } from '../services/product-service/product-service.service';
import { Category } from '../models/productTemplate';
import { CommonModule } from '@angular/common';



@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent , CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {  
  @ViewChild('scrollContainer', { static: false }) scrollContainer!: ElementRef; 
  currentYear: number = new Date().getFullYear();
  categoryItems: Category[] = []; 

  // productService = inject(ProductServiceService);
  // toaster = inject(ToastrService); 

  constructor(private productService: ProductServiceService) {
    
  }
  
  ngOnInit(): void {
    this.getAllCategories(); 
  }

  getAllCategories() {
    this.productService.getCategories().subscribe({
      next: (data) => {
        console.log(data)
        this.categoryItems = data
      },
      error: (error) => {
        // this.toaster.error('error fetching categories'); 
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