import { Component, inject, OnDestroy, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { PaymentService } from "../services/payment-service/payment.service";
import { ToastrService } from "ngx-toastr";
import { AlertServiceService } from "../services/sweetAlert/alert-service.service";
import { CartServiceService } from "../services/cart-service/cart-service.service";
import { Subscription } from "rxjs";

@Component({
  selector: "app-payment-success",
  standalone: true,
  imports: [],
  templateUrl: "./payment-success.component.html",
  styleUrl: "./payment-success.component.scss",
})
export class PaymentSuccessComponent implements OnInit , OnDestroy {
  // injections
  activeRoute = inject(ActivatedRoute);
  paymentService = inject(PaymentService);
  toaster = inject(ToastrService);
  sweetAlert = inject(AlertServiceService);
  router = inject(Router);
  cartService = inject(CartServiceService);
  isLoading = true;
  routeSubscription!: Subscription; 
  

  ngOnInit(): void {
    const addressId: number = parseInt(localStorage.getItem("addressId") || "");

   this.routeSubscription =  this.activeRoute.queryParams.subscribe((params) => {
     const reference = params["reference"];
     const sessionId = params["session_id"];
      if (reference && addressId) {
        this.paymentService
          .verifyPaystackPayment(reference, addressId)
          .subscribe({
            next: () => {
              this.sweetAlert.successMessage("Payment Successful", "");
              this.clearUserCart();
            },
            error: (error) => {
              console.log(error);
              this.router.navigate(["/shipping"]);
              this.toaster.error("Error verifying payment");
            },
          });
     }
     
     if (sessionId && addressId) {
      this.paymentService
        .verifyStripePayment(sessionId, addressId)
        .subscribe({
          next: () => {
            this.sweetAlert.successMessage("Payment Successful", "");
            this.clearUserCart();
          },
          error: (error) => {
            console.log(error);
            this.router.navigate(["/shipping"]);
            this.toaster.error("Error verifying payment");
          },
        });
    }
  }); 
  }

  ngOnDestroy(): void {
    this.routeSubscription.unsubscribe(); 
  }

  clearUserCart() {
    this.cartService.clearUserCart().subscribe({
      next: () => {
        localStorage.setItem("userCart", "[]");
        this.cartService.cartCount.next(0);
        this.isLoading = false; 
        this.router.navigate(["/orders"]);
      },
      error: (error) => {
        console.log(error);
        this.isLoading = false;
        this.toaster.error("Error clearing user cart");
      },
    });
  }
}
