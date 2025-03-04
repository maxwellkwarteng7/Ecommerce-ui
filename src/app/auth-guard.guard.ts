import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

export const authGuardGuard: CanActivateFn = (route, state) => {
  // get the token 
  const cookie = inject(CookieService); 
  const router = inject(Router); 
  const token = cookie.get('token'); 
  if (!token) {
    router.navigate(['/login']); 
    return false;
  } 
  return true;
};
