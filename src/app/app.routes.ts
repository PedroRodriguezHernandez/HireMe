import { Routes } from '@angular/router';
export const routes: Routes = [
  {
    path: "my-offers", loadComponent: () => import("./features/my-offers/my-offers.component")
      .then(m => m.MyOffersComponent)
  },
  {
    path: "my-profile", loadComponent: () => import("./profile/profile.component")
      .then(m => m.ProfileComponent)
  },
  {
    path: "login", loadComponent: () => import("./login-page/login-page.component")
      .then(m => m.LoginPageComponent)
  },
  {
    path: "create", loadComponent: () => import("./create/create.component")
      .then(m => m.CreateComponent)
  },
  {
    path: "home", loadComponent: () => import("./features/home-page/home-page.component")
      .then(m => m.HomePageComponent)
  },
  {
    path: "register", loadComponent: () => import("./register-page/register-page.component")
      .then(m => m.RegisterPageComponent)
  },
  {
    path: "", loadComponent: () => import("./initial-page/initial-page.component")
      .then(m => m.InitialPageComponent)
  },
];
