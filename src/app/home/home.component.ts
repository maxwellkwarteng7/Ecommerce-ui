import { AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { NavbarComponent } from "../navbar/navbar.component";
import { FormsModule } from '@angular/forms';



@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent, FormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {  
  @ViewChild('scrollContainer' , {static : false}) scrollContainer!: ElementRef; 
  ngOnInit(): void {
    
  }
  
  categoryItems = [
    {
      categoryName: 'name', 
      image : 'home-images/one.jpg'
    } , 
    {
      categoryName: 'name', 
      image : 'home-images/hero-image.png'
    } , 
    {
      categoryName: 'name', 
      image : 'home-images/two.jpg'
    } , 
    {
      categoryName: 'name', 
      image : 'home-images/two.jpg'
    } , 
    {
      categoryName: 'name', 
      image : 'home-images/two.jpg'
    } , 
    {
      categoryName: 'name', 
      image : 'home-images/two.jpg'
    } , 
    {
      categoryName: 'name', 
      image : 'home-images/one.jpg'
    } , 
    {
      categoryName: 'name', 
      image : 'home-images/two.jpg'
    } , 
    {
      categoryName: 'name', 
      image : 'home-images/one.jpg'
    } , 
  
  ] 
  
  
  handleScroll(type: string) {
    const container = this.scrollContainer.nativeElement; 
    const scrollamount = 200;
    type && type === 'previous' ? container.scrollLeft -= scrollamount : container.scrollLeft += scrollamount;
  }

}