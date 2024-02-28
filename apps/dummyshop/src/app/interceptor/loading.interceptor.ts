import { inject } from '@angular/core';
import {
  HttpInterceptorFn
} from '@angular/common/http';
import { finalize } from 'rxjs/operators';
import { LoaderService } from './loader.service';

export const loadingInterceptor: HttpInterceptorFn = (req, next) => {
        const loadingService = inject(LoaderService);
        let totalRequests = 0;
        console.log('caught')
        totalRequests++;
        loadingService.setLoading(true);
        return next(req).pipe(
            finalize(() => {
              totalRequests--;
              if (totalRequests == 0) {
                loadingService.setLoading(false);
              }
            })
          );
};