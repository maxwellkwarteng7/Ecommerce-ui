import { Component, Input, InputDecorator, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CartServiceService } from '../services/cart-service/cart-service.service';
import { AuthServiceService } from '../services/auth-service/auth-service.service';
import { CommonModule } from '@angular/common';
import { AlertServiceService } from '../services/sweetAlert/alert-service.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink , CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnInit {


  hamburger: boolean = false; 
  cartNumber!: number; 
  isLoggedIn: boolean = false;


  constructor(private cartService: CartServiceService, private authService: AuthServiceService, private router: Router , private alert : AlertServiceService) {
  }

  ngOnInit(): void {
    this.isLoggedIn = this.authService.isAuthenticated(); 
    this.cartService.cartCount$.subscribe(count => this.cartNumber = count); 
  }

 
  toggleHamburger() {
    this.hamburger = !this.hamburger ;  
  }

  maintainHamburger() {
    this.hamburger = false; 
  }

  logUserOut() {
    this.alert.fireAlert('Proceed to Logout ?', 'You cannot reserve this action').then((result) => {
      if (result.isConfirmed) {
        this.authService.Logout(); 
        this.router.navigate(['/login']); 
       }
    });
  }

}
