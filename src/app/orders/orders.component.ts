import { Component, inject } from '@angular/core';
import { NavbarComponent } from "../navbar/navbar.component";
import { FooterComponent } from "../footer/footer.component";
import { OrdersService } from '../services/orders-service/orders.service';
import { Orders } from '../models/templates';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [NavbarComponent, FooterComponent],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.scss'
})
export class OrdersComponent {

  // variables 
  orders : Orders[] = []; 

  // injections 
  ordersService = inject(OrdersService); 



}
