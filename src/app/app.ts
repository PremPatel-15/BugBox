import { Component } from '@angular/core';
import { BugForm } from './pages/bug-form/bug-form';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [BugForm],
  templateUrl: './app.html',
  styleUrls: ['./app.css'],
})
export class App {}
