import { Component, inject, OnInit } from '@angular/core';
import { NavbarComponent } from "../navbar/navbar.component";
import { FooterComponent } from "../footer/footer.component";
import { OrdersService } from '../services/orders-service/orders.service';
import { Orders } from '../models/templates';
import { ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common';

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

  // injections 
  ordersService = inject(OrdersService);
  toaster = inject(ToastrService);

  ngOnInit(): void {
    // this.getUserOrders();
  }


  getUserOrders() {
    this.loaders.allOrders = true;
    this.ordersService.getOrders().subscribe({
      next: (data) => {
        this.orders = data,
          console.log(this.orders); 
      } , 
      error: (err) => {
        console.log(err);
        this.toaster.error('Error fetching orders');
      },
      complete: () => this.loaders.allOrders = false
    });
  }
  
}
