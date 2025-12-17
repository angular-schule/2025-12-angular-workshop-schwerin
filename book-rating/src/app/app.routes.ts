import { Routes } from '@angular/router';
import { DashboardPage } from './books/dashboard-page/dashboard-page';
import { BookDetailsPage } from './books/book-details-page/book-details-page';

export const routes: Routes = [

  { path: 'books', component: DashboardPage, title: 'Dashboard' },
  { path: 'books/:isbn', component: BookDetailsPage, title: 'Details' },
  { path: '', redirectTo: 'books', pathMatch: 'full' }

];
