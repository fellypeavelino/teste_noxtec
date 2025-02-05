import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { LoadingServiceService } from '../services/loading-service.service';
import { finalize } from 'rxjs';

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
  const loadingService = inject(LoadingServiceService);
  loadingService.setLoading(true);

  return next(req).pipe(
    finalize(() => loadingService.setLoading(false))
  );
};
