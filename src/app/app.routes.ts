import { Routes } from '@angular/router';
import { BugList } from './pages/bug-list/bug-list';
import { BugForm } from './pages/bug-form/bug-form';
import { Dashboard } from './pages/dashboard/dashboard';

export const routes: Routes = [
  { path: 'buglist', component: BugList },
  { path: 'add', component: BugForm },
  { path: 'edit/:id', component: BugForm },
  { path: 'dashboard', component: Dashboard },
];
