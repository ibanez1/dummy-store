import { Route } from '@angular/router';
import { LandingComponent } from './views/landing/landing.component';
import { notAuthGuard, authGuard } from './auth/guards/auth.guard';
import { provideDummyShop } from './index';

export const appRoutes: Route[] = [
    {
        path: '',
        providers: [provideDummyShop()],
        component: LandingComponent
    },
    {
        path: 'home',
        canMatch: [authGuard],
        providers: [provideDummyShop()],
        loadComponent: () => 
            import('./views/home/home.component').then(m => m.HomeComponent)
    },
    {
        path: 'login',
        canMatch: [notAuthGuard],
        providers: [provideDummyShop()],
        loadComponent: () => 
            import('./views/login/login.component').then(m => m.LoginComponent)
    },
    {
        path: 'favorites',
        canMatch: [authGuard],
        providers: [provideDummyShop()],
        loadComponent: () => 
            import('./views/favorites/favorites.component').then(m => m.FavoritesComponent)
    },
    {
        path: '**',
        redirectTo: '',
    },
  ];
