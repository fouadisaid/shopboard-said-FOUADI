import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = () => {
  const router = inject(Router);
  const estConnecte = false; 

  if (!estConnecte) {
    router.navigate(['/']);
    return false;
  }
  return true;
};