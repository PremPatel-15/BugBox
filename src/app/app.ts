import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Sidebar } from './pages/sidebar/sidebar';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [Sidebar, RouterOutlet],
  templateUrl: './app.html',
  styleUrls: ['./app.css'],
})
export class App {}
