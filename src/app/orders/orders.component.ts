import { Component, inject, OnInit } from '@angular/core';
import { NavbarComponent } from "../navbar/navbar.component";
import { FooterComponent } from "../footer/footer.component";
import { OrdersService } from '../services/orders-service/orders.service';
import { Orders, OrderShippingAddress } from '../models/templates';
import { ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [NavbarComponent, FooterComponent , CommonModule],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.scss'
})
export class OrdersComponent implements OnInit {

  // variables 
  orders: Orders[] = [];
  loaders = {
    allOrders: false 
  }
  orderItemsCount!: number; 

  // injections 
  ordersService = inject(OrdersService);
  toaster = inject(ToastrService);
  router = inject(Router); 

  ngOnInit(): void {
    this.getUserOrders();
  }


  getUserOrders() {
    this.loaders.allOrders = true;
    this.ordersService.getOrders().subscribe({
      next: ({ userOrders}) => {
        this.orders = userOrders; 
      }, 
      error: (err) => {
        console.log(err);
        this.toaster.error('Error fetching orders');
      },
      complete: () => this.loaders.allOrders = false
    });
  }

  handleOrderDetails(OrderAddress: OrderShippingAddress , orderId: number) {
    this.router.navigate(['/order-detail', orderId], {state : {address : OrderAddress}});  
  }

  getOrderTotalPrice(price: number): string {
    return price.toFixed(2);
  }
  
}
