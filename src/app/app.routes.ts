import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './auth/login/login.component';
import { SignUpComponent } from './auth/sign-up/sign-up.component';

export const routes: Routes = [
    {
        path : "" , 
        redirectTo: 'home', 
        pathMatch: 'full'
    }, 
    {
        path: 'home', 
        component : HomeComponent
    } , 
    {
        path: 'login', 
        component: LoginComponent
    }, 
    {
        path: 'sign-up', 
        component : SignUpComponent
    }
];
