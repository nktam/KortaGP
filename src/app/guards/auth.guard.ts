import {inject} from '@angular/core';
import {CanActivateFn, Router} from '@angular/router';
import {AuthService} from '../services/auth.service';

export const authGuard: CanActivateFn=async (route, state) => {
  const authService=inject(AuthService);
  const router=inject(Router);

  if(await authService.logeado()) {
    return true;
  } else {
    console.log('...LOGEADO: '+await authService.logeado());

    router.navigate(['/login']);
    return false;
  }
};
