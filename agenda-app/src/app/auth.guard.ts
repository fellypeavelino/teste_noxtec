import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';

import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { GuardService } from './guard.service';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(GuardService);
  const router = inject(Router);

  if (authService.isLoggedIn()) {
    return true;
  } else {
    router.navigate(['error']);
    return false;
  }
};