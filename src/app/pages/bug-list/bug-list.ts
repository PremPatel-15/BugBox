import { Component, signal } from '@angular/core';
import { BugService } from '../../service/bug-service';
import { Bug } from '../../service/type';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-bug-list',
  standalone: true,
  imports: [AsyncPipe],
  templateUrl: './bug-list.html',
  styleUrl: './bug-list.css',
})
export class BugList {
  bugData = signal<Bug[]>([]);
  constructor(
    private bugService: BugService,
    private route: Router,
  ) {}
  // ngOnInit() {
  //   this.bugService.getAllBug().subscribe((data) => {
  //     this.bugData.set(data);
  //   });
  // }

  allBug$: Observable<Bug[]> | undefined;
  ngOnInit() {
    this.allBug$ = this.bugService.getAllBug();
  }

  removeBug(id: number) {
    this.bugService.deleteBug(id).subscribe({
      next: () => {
        this.bugData.set(this.bugData().filter((b) => b.id !== id));
      },

      error: (err) => {
        console.log('Error: ', err);
      },
    });

    alert('Saved');
    this.route.navigate(['/buglist']);
  }

  goToEdit(id: number) {
    this.route.navigate(['/edit', id]);
  }
}
