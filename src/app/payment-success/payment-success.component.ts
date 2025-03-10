import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PaymentService } from '../services/payment-service/payment.service';
import { ToastrService } from 'ngx-toastr';
import { AlertServiceService } from '../services/sweetAlert/alert-service.service';

@Component({
  selector: 'app-payment-success',
  standalone: true,
  imports: [],
  templateUrl: './payment-success.component.html',
  styleUrl: './payment-success.component.scss'
})
export class PaymentSuccessComponent implements OnInit {

  // injections 
  activeRoute = inject(ActivatedRoute); 
  paymentService = inject(PaymentService); 
  toaster = inject(ToastrService); 
  sweetAlert = inject(AlertServiceService); 

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
