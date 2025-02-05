import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { LoadingServiceService } from '../services/loading-service.service';
import { finalize } from 'rxjs';

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
  const loadingService = inject(LoadingServiceService);
  const authToken = localStorage.getItem("token");
  
  loadingService.setLoading(true);

  const authReq = req.clone({
    setHeaders: {
      Authorization: `Bearer ${authToken}`
    }
  });

  return next(authReq).pipe(
    finalize(() => loadingService.setLoading(false))
  );
};
