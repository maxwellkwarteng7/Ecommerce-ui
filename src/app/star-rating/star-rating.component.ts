import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-star-rating',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './star-rating.component.html',
  styleUrl: './star-rating.component.scss'
})
export class StarRatingComponent {
  @Input() rating: number = 0; 

  // get the stars 
  getStars(): number { 
    return Math.round(this.rating); 
  }


  get FullStars() : number[] {
    return Array(this.getStars()).fill(0); 
  }

  get EmptyStars(): number[] {
    return Array(5 - this.getStars()).fill(0); 
  }
}
