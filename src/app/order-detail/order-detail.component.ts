import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OrderShippingAddress } from '../models/templates';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-order-detail',
  standalone: true,
  imports: [],
  templateUrl: './order-detail.component.html',
  styleUrl: './order-detail.component.scss'
})
export class OrderDetailComponent implements OnInit {
  orderAddress!: OrderShippingAddress;
  orderId!: number;



  // all injections 
  activeRoute = inject(ActivatedRoute);
  router = inject(Router);

  ngOnInit(): void {
    const id = this.activeRoute.snapshot.paramMap.get('orderId');
    this.orderId = id ? parseInt(id) : 0;
  }




}
