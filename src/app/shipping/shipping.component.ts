import { AfterViewInit, Component, inject, OnInit } from "@angular/core";
import { NavbarComponent } from "../navbar/navbar.component";
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import { CommonModule } from "@angular/common";
import { Address, Cart } from "../models/templates";
import { PaymentService } from "../services/payment-service/payment.service";
import { ToastrService } from "ngx-toastr";
import { ShippingService } from "../services/shipping-service/shipping.service";
import { AlertServiceService } from "../services/sweetAlert/alert-service.service";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-shipping",
  standalone: true,
  imports: [NavbarComponent, ReactiveFormsModule, CommonModule],
  templateUrl: "./shipping.component.html",
  styleUrl: "./shipping.component.scss",
})
export class ShippingComponent implements OnInit {
  isPaymentActive: boolean = false;
  cartItems: Cart[] = [];
  total: any;
  itemsCount!: number;
  paymentLink: string = "";
  addressArray: Address[] = [];
  newAddressState: boolean = false;
  isEditingAddress: boolean = false;
  selectedAddress!: number;
  dynamicAddressId!: number; 
  paymentMethod: string = 'paystack'; 

  loaders = {
    checkoutLoader: false,
    addressLoader: false,
    pageLoader: false,
  };

  // all injections here
  paymentService = inject(PaymentService);
  toaster = inject(ToastrService);
  shippingService = inject(ShippingService);
  alert = inject(AlertServiceService);
  activeRoute = inject(ActivatedRoute); 
  sweetAlert = inject(AlertServiceService); 

  ngOnInit(): void {
    this.cartItems = JSON.parse(localStorage.getItem("userCart") || "[]");
    this.itemsCount = this.cartItems.length;
    this.getAddresses();
  }

  billingAddressForm: FormGroup = new FormGroup({
    fullName: new FormControl("", [Validators.required]),
    phone: new FormControl("", [Validators.required]),
    address1: new FormControl("", [Validators.required]),
    address2: new FormControl(""),
    country: new FormControl("", [Validators.required]),
    city: new FormControl("", [Validators.required]),
    state: new FormControl("", [Validators.required]),
  });

  get Fields() {
    return this.billingAddressForm.controls;
  }

  getSubtotal() {
    let total = this.cartItems.reduce((acc, item) => {
      let itemPrice =
        item.discountPrice !== null ? item.discountPrice : item.price;
      return itemPrice * item.quantity + acc;
    }, 0);
    this.total = total.toFixed(2);
    return this.total;
  }

  getPaymentLink() {
    this.loaders.checkoutLoader = true;
      this.paymentService.initiatePayment(this.paymentMethod).subscribe({
        next: (data) => {
          this.paymentLink = data.link;
          window.open(this.paymentLink, "_blank");
          this.loaders.checkoutLoader = false;
        },
        error: (error) => {
          console.log(error);
          this.toaster.error("Error fetching payment link");
          this.loaders.checkoutLoader = false;
        },
      });
  }

  handlePay() {
    this.getPaymentLink();
  }

  handlePaymentMethod(method: string) {
    this.paymentMethod = method; 
  }

  showAddress() {
    this.isEditingAddress = false;
    this.billingAddressForm.reset();
    this.newAddressState = !this.newAddressState;
  }

  handleAddress() {
    this.loaders.addressLoader = true;
    const addressInfo: Address = this.billingAddressForm.value;
    if (this.isEditingAddress) {
      addressInfo.id = this.dynamicAddressId;
      this.shippingService.updateAddress(addressInfo).subscribe({
        next: () => {
          this.loaders.addressLoader = false;
          this.getAddresses();
          this.billingAddressForm.reset(); 
          this.toaster.success("Address updated !");
        },
        error: (error) => {
          console.log(error);
          this.loaders.addressLoader = false;
          this.toaster.error("Error updating address");
        },
      });
    } else {
      this.shippingService.postUserAddress(addressInfo).subscribe({
        next: () => {
          this.getAddresses();
          this.billingAddressForm.reset(); 
          this.loaders.addressLoader = false;
          this.toaster.success("Address Saved !");
        },
        error: (error) => {
          this.loaders.addressLoader = false;
          console.log(error);
          this.toaster.error("Error saving Address");
        },
      });
    }
  }

  // get addresses
  getAddresses() {
    this.loaders.pageLoader = true; 
    this.shippingService.getUserAddresses().subscribe({
      next: (data) => {
        this.addressArray = data;
        if (data.length <= 0) {
          this.newAddressState = true;
          this.isPaymentActive = false;
        }
        this.loaders.pageLoader = false;
      },
      error: (error) => {
        console.log(error);
        this.toaster.error("Error fetching addresses");
        this.loaders.pageLoader = false;
      },
    });
  }

  handleSelection(addressId: number) {
    this.selectedAddress = addressId;
    localStorage.setItem('addressId', JSON.stringify(this.selectedAddress)); 
    this.isPaymentActive = true;
  }

  deleteUserAddress(addressId: number) {
    this.alert
      .fireAlert(
        "Are you sure you want to delete ?",
        "You cannot revert this action"
      )
      .then((result) => {
        if (result.isConfirmed) {
          this.shippingService.deleteAddress(addressId).subscribe({
            next: () => {
              this.getAddresses();
              this.toaster.success("Address deleted");
            },
            error: (error) => {
              console.log(error);
              this.toaster.error("Error deleting address");
            },
          });
        }
      });
  }

  EdituserAddress(item: Address) {
    this.isEditingAddress = true;
    this.newAddressState = true;
    this.dynamicAddressId = item.id; 
    this.billingAddressForm.patchValue(item);
  }
}
