import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthSupabaseService } from '../services/auth-supabase.service';
import { map } from 'rxjs/operators';
import { AuthInterface } from '../interface/auth-interface';

export const authGuard: CanActivateFn = (route, state) => {
  const authService: AuthInterface = inject(AuthSupabaseService);
  const router = inject(Router);

  const publicRoutes = ['/', '/login', '/register'];

  return authService.getCurrentUser().pipe(
    map(user => {
      const isPublicRoute = publicRoutes.includes(state.url);

      if (user) {
        return true;
      } else if (isPublicRoute) {
        return true
      } else {
        router.navigate(['/']);
        return false;
      }
    })
  );
};
