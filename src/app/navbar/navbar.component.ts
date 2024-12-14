import { Component, Input, InputDecorator } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {

  @Input() childMessage!: string; 

  hamburger: boolean = false; 

 
  toggleHamburger() {
    this.hamburger = !this.hamburger ;  
  }

  maintainHamburger() {
    this.hamburger = false; 
  }

}
