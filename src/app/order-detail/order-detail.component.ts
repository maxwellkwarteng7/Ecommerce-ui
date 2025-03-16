import { Component, inject, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { details, OrderShippingAddress } from "../models/templates";
import { FooterComponent } from "../footer/footer.component";
import { NavbarComponent } from "../navbar/navbar.component";
import { CommonModule, Location } from "@angular/common";
import { TruncatePipe } from "../truncate.pipe";
import { OrdersService } from "../services/orders-service/orders.service";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-order-detail",
  standalone: true,
  imports: [FooterComponent, NavbarComponent, TruncatePipe, CommonModule],
  templateUrl: "./order-detail.component.html",
  styleUrl: "./order-detail.component.scss",
})
export class OrderDetailComponent implements OnInit {
  orderAddress!: OrderShippingAddress;
  orderId!: number;
  orderItems: details[] = [];
  loading: boolean = false;


  // all injections
  activeRoute = inject(ActivatedRoute);
  location = inject(Location);
  orderService = inject(OrdersService);
  toaster = inject(ToastrService);
  page: number = 1 ;

  ngOnInit(): void {
    const id = this.activeRoute.snapshot.paramMap.get("orderId");
    this.orderId = id ? parseInt(id) : 0;

    // getting the address data
    this.orderAddress = history.state["address"];
    this.getUserOderItems(this.orderId);
  }

  goBack() {
    this.location.back();
  }

  getUserOderItems(orderId: number) {
    this.loading = true;
    this.orderService.getOrderItems(orderId , this.page , 10).subscribe({
      next: (data) => {
        this.page = data.currentPage; 
        this.orderItems = data.orderItems;
      },
      error: (error) => {
        console.log(error);
        this.toaster.error("Error fetching order items");
      },
      complete: () => (this.loading = false),
    });
  }
}
