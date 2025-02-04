import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';

import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { GuardService } from '../services/guard.service';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(GuardService);
  const router = inject(Router);
  const logado = localStorage.getItem("logado");
  if (authService.isLoggedIn() || logado == "true") {
    return true;
  } else {
    //router.navigate(['error']);
    router.navigate(['loguin']);
    return false;
  }
};