import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OrderShippingAddress } from '../models/templates';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-order-detail',
  standalone: true,
  imports: [],
  templateUrl: './order-detail.component.html',
  styleUrl: './order-detail.component.scss'
})
export class OrderDetailComponent implements OnInit , OnDestroy {
  orderAddress!: OrderShippingAddress; 
  orderId!: number; 
  private routeSub!: Subscription;


  // all injections 
  activeRoute = inject(ActivatedRoute); 

  ngOnInit(): void {
  this.routeSub = this.activeRoute.paramMap.subscribe(param => {
    const orderId = param.get('orderId');
    if (orderId) {
      this.orderId = parseInt(orderId); 
    }
    })
  }

ngOnDestroy(): void {
  this.routeSub.unsubscribe(); 
}

}
