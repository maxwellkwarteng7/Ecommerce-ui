import { Component, EventEmitter, Output } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { NavbarComponent } from "../navbar/navbar.component";
import { FormsModule } from '@angular/forms';
import { SidebarComponent } from "../sidebar/sidebar.component";
import { ProductsComponent } from "../products/products.component";


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent, FormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {  
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
      image : 'home-images/two.jpg'
    } , 
  ]  
}