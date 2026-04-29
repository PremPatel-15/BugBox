import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  imports: [],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css',
})
export class Sidebar {
  constructor(private router: Router) {}
  goToDashboard() {
    this.router.navigate(['/dashboard']);
  }
  goToBugList() {
    this.router.navigate(['/buglist']);
  }
  goToAdd() {
    this.router.navigate(['/add']);
  }
}
