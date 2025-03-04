import { inject } from '@angular/core';
import { CanActivateChildFn, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

export const authRedirectGuard: CanActivateChildFn = (childRoute, state) => {
   const cookie = inject(CookieService); 
    const router = inject(Router); 
    const token = cookie.get('token'); 
    if (token) {
      router.navigate(['/home']); 
      return false;
    }
  return true;
};
