import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './auth/login/login.component';
import { SignUpComponent } from './auth/sign-up/sign-up.component';
import { PasscodeComponent } from './passcode/passcode.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { ProductsComponent } from './products/products.component';
import { CartComponent } from './cart/cart.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';

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
    }, 
    {
        path: "forgot-password", 
        component : ForgotPasswordComponent
    }, 
    {
        path: "pin-verification", 
        component : PasscodeComponent
    },
    {
        path: 'product-detail/:id', 
        component : ProductDetailsComponent
    },
    {
        path: 'products', 
        component : ProductsComponent
    }, 
    {
        path: 'cart', 
        component : CartComponent
    }
];
