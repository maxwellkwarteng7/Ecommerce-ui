import { Component, inject, Inject } from '@angular/core';
import { NavbarComponent } from "../navbar/navbar.component";
import { FooterComponent } from "../footer/footer.component"; 
import { Location } from '@angular/common';
import { TruncatePipe } from '../truncate.pipe';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [NavbarComponent, FooterComponent , TruncatePipe],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent {
 

  private location = inject(Location); 





  goBack() {
    this.location.back();
  }

}
