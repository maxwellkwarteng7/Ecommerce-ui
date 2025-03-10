import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PaymentService } from '../services/payment-service/payment.service';
import { AlertServiceService } from '../services/sweetAlert/alert-service.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [],
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
    const addressId: number = parseInt(localStorage.getItem('addressId') || '');
     
      this.activeRoute.queryParams.subscribe(params => {
        const reference = params['reference'];  
        if (reference) {
          this.paymentService.verifyPaystackPayment(reference , addressId).subscribe({
            next: () => {
              this.sweetAlert.successMessage('Payment Successful', ''); 
            }, 
            error: (error) => {
              console.log(error); 
              this.toaster.error('Error verifying payment'); 
            }
          })
        }
      })
  }

  

}
