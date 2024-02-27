import { inject } from '@angular/core';
import { CanMatchFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const authGuard: CanMatchFn = (route, state) => {
    const authService = inject(AuthService);
    const router = inject(Router);
    if (!(authService as any).isAuthenticated()) {
      router.navigate(['/login']);
      return false;
    }
    return true;
  };
  
  export const notAuthGuard: CanMatchFn = (route, state) => {
    const authService = inject(AuthService);
    const router = inject(Router);
    if ((authService as any).isAuthenticated()) {
      router.navigate(['']);
      return false;
    }
    return true;
  };

