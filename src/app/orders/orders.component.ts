import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PaymentService } from '../services/payment-service/payment.service';
import { AlertServiceService } from '../services/sweetAlert/alert-service.service';
import { ToastrService } from 'ngx-toastr';
import { NavbarComponent } from "../navbar/navbar.component";
import { FooterComponent } from "../footer/footer.component";

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [NavbarComponent, FooterComponent],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.scss'
})
export class OrdersComponent implements OnInit {

  // injections 
  activeRoute = inject(ActivatedRoute); 
  paymentService = inject(PaymentService); 
  sweetAlert = inject(AlertServiceService);
  toaster = inject(ToastrService); 
  
  ngOnInit(): void {
    
  }

  

}
