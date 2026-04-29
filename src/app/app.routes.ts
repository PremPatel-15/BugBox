import { Routes } from '@angular/router';
import { BugList } from './pages/bug-list/bug-list';
import { BugForm } from './pages/bug-form/bug-form';

export const routes: Routes = [
  { path: 'bugList', component: BugList },
  { path: 'add', component: BugForm },
  { path: 'edit/:id', component: BugForm },
];
