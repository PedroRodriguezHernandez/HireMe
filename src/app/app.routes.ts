import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: "", loadComponent: () => import("./login-page/login-page.component")
      .then(m => m.LoginPageComponent)
  },
  {
    path: "my-offers", loadComponent: () => import("./features/my-offers/my-offers.component")
      .then(m => m.MyOffersComponent)
  },
  {
    path: "my-profile", loadComponent: () => import("./profile/profile.component")
      .then(m => m.ProfileComponent)
  },
];
