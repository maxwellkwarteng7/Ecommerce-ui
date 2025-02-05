import { Component, EventEmitter, Output } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { NavbarComponent } from "../navbar/navbar.component";
import { FormsModule } from '@angular/forms';
import { SidebarComponent } from "../sidebar/sidebar.component";
import { ProductsComponent } from "../products/products.component";


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent, FormsModule, SidebarComponent, ProductsComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {  
}