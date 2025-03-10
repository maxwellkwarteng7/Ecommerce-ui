import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './auth/login/login.component';
import { SignUpComponent } from './auth/sign-up/sign-up.component';
import { PasscodeComponent } from './passcode/passcode.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { ProductsComponent } from './products/products.component';
import { CartComponent } from './cart/cart.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { NewPasswordComponent } from './new-password/new-password.component';
import { authGuard } from './auth.guard';
import { authRedirectGuard } from './auth-redirect.guard';
import { OrdersComponent } from './orders/orders.component';
import { ShippingComponent } from './shipping/shipping.component';
import { PaymentSuccessComponent } from './payment-success/payment-success.component';

export const routes: Routes = [
    {
        path : "" , 
        redirectTo: 'home', 
        pathMatch: 'full'
    }, 
    {
        path: 'home', 
        component: HomeComponent, 
    } , 
    {
        path: 'login', 
        component: LoginComponent, 
        canActivate : [authRedirectGuard]
    }, 
    {
        path: 'sign-up', 
        component: SignUpComponent, 
        canActivate : [authRedirectGuard]
    }, 
    {
        path: "forgot-password", 
        component: ForgotPasswordComponent, 
        canActivate : [authRedirectGuard]
    }, 
    {
        path: "pin-verification", 
        component: PasscodeComponent, 
        canActivate : [authRedirectGuard]
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
    },
    {
        path: 'new-password', 
        component: NewPasswordComponent, 
        canActivate : [authRedirectGuard]
    } , 
    {
        path: '',  
        canActivateChild : [authGuard] , 
        children: [
            {
                path: 'orders', 
                component : OrdersComponent
            }, 
            {
                path: 'shipping', 
                component : ShippingComponent
            }, 
            {
                path: 'payment-success', 
                component : PaymentSuccessComponent
            }
        ]
        
    }
];
