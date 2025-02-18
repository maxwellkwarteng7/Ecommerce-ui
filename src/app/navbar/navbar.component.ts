import { Component, Input, InputDecorator, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CartServiceService } from '../services/cart-service/cart-service.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnInit {


  hamburger: boolean = false; 
  cartNumber!: number; 


  constructor(private cartService: CartServiceService) {
  }

  ngOnInit(): void {
    this.cartService.cartCount$.subscribe(count => this.cartNumber = count); 
  }

 
  toggleHamburger() {
    this.hamburger = !this.hamburger ;  
  }

  maintainHamburger() {
    this.hamburger = false; 
  }

}
