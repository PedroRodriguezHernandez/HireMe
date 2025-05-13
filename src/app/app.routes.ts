import {authGuard} from './core/guards/auth.guard';
import {Routes} from '@angular/router';

export const routes: Routes = [
  {
    path: "my-offers",
    canActivate: [authGuard],
    loadComponent: () => import("./features/my-offers/my-offers.component")
      .then(m => m.MyOffersComponent)
  },
  {
    path: "my-profile",
    canActivate: [authGuard],
    loadComponent: () => import("./profile/profile.component")
      .then(m => m.ProfileComponent)
  },
  {
    path: "create",
    canActivate: [authGuard],
    loadComponent: () => import("./create/create.component")
      .then(m => m.CreateComponent)
  },
  {
    path: "home",
    canActivate: [authGuard],
    loadComponent: () => import("./features/home-page/home-page.component")
      .then(m => m.HomePageComponent)
  },
  {
    path: "login",
    canActivate: [authGuard],
    loadComponent: () => import("./login-page/login-page.component")
      .then(m => m.LoginPageComponent)
  },
  {
    path: "register",
    canActivate: [authGuard],
    loadComponent: () => import("./register-page/register-page.component")
      .then(m => m.RegisterPageComponent)
  },
  {
    path: "",
    canActivate: [authGuard],
    loadComponent: () => import("./initial-page/initial-page.component")
      .then(m => m.InitialPageComponent)
  },
];
