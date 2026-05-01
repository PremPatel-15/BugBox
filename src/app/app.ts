import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { Sidebar } from './pages/sidebar/sidebar';
import { Navbar } from './pages/navbar/navbar';
import { BugList } from './pages/bug-list/bug-list';
import { BugForm } from './pages/bug-form/bug-form';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [Sidebar, Navbar, RouterOutlet],
  templateUrl: './app.html',
  styleUrls: ['./app.css'],
})
export class App {}
