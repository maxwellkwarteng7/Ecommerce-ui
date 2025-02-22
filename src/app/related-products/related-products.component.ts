import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-related-products',
  standalone: true,
  imports: [],
  templateUrl: './related-products.component.html',
  styleUrl: './related-products.component.scss'
})
export class RelatedProductsComponent {
  @ViewChild('scrollContainer', { static: false }) scrollContainer!: ElementRef;
  
    handleScroll(type: string) {
      const container = this.scrollContainer.nativeElement;
      const scrollamount = 310;
      type && type === 'previous' ? container.scrollLeft -= scrollamount : container.scrollLeft += scrollamount;
    }
  
}
