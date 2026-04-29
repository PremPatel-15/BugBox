import { Component, signal } from '@angular/core';
import { BugService } from '../../service/bug-service';
import { Bug } from '../../service/type';
import { Router } from '@angular/router';

@Component({
  selector: 'app-bug-list',
  imports: [],
  templateUrl: './bug-list.html',
  styleUrl: './bug-list.css',
})
export class BugList {
  bugData = signal<Bug[]>([]);
  constructor(
    private bugService: BugService,
    private route: Router,
  ) {}
  ngOnInit() {
    this.bugService.getAllBug().subscribe((data) => {
      this.bugData.set(data);
    });
  }

  removeBug(id: number) {
    this.bugService.deleteBug(id).subscribe(() => {
      this.bugData.set(this.bugData().filter((b) => b.id !== id));
    });
  }

  goToEdit(id: number) {
    this.route.navigate(['/edit', id]);
  }
}
