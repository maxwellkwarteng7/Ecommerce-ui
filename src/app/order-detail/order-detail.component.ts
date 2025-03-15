import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OrderShippingAddress } from '../models/templates';
import { FooterComponent } from "../footer/footer.component";
import { NavbarComponent } from "../navbar/navbar.component";
import { Location } from '@angular/common';
import { TruncatePipe } from '../truncate.pipe';
import { Product } from '../models/productTemplate';

@Component({
  selector: 'app-order-detail',
  standalone: true,
  imports: [FooterComponent, NavbarComponent , TruncatePipe] , 
  templateUrl: './order-detail.component.html',
  styleUrl: './order-detail.component.scss'
})
export class OrderDetailComponent implements OnInit {
  orderAddress!: OrderShippingAddress;
  orderId!: number;
  orderItems: Product[] = []; 
  loading: boolean = true; 
  



  // all injections 
  activeRoute = inject(ActivatedRoute);
  router = inject(Router);
  location = inject(Location); 

  ngOnInit(): void {
    const id = this.activeRoute.snapshot.paramMap.get('orderId');
    this.orderId = id ? parseInt(id) : 0;
  }

  goBack() {
    this.location.back();
  }




}
