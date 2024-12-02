import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterOutlet , RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  hamburger: boolean = false; 

 
  toggleHamburger() {
    this.hamburger = !this.hamburger ;  
  }

  maintainHamburger() {
    this.hamburger = false; 
  }

}
