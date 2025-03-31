import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'admin/hotel-list', pathMatch: 'full' },
  {
    path: 'admin/hotel-list',
    loadComponent: () =>
      import('./admin/components/admin-list/admin-list.component').then(
        (mod) => mod.AdminListComponent
      ),
  },
  {
    path: 'admin/hotel-detail/:id',
    loadComponent: () =>
      import('./admin/components/hotel-detail/hotel-detail.component').then(
        (mod) => mod.HotelDetailComponent
      ),
  },
  {
    path: 'dashboard',
    loadComponent: () =>
      import('./auth/components/dashboard/dashboard.component').then(
        (mod) => mod.DashboardComponent
      ),
  },
  {
    path: 'user',
    loadComponent: () =>
      import('./auth/components/user/user.component').then(
        (mod) => mod.UserComponent
      ),
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./auth/components/login/login.component').then(
        (mod) => mod.LoginComponent
      ),
  },
  {
    path: 'registration',
    loadComponent: () =>
      import('./auth/components/registration/registration.component').then(
        (mod) => mod.RegistrationComponent
      ),
  },
];
