import { Component, signal } from '@angular/core';
import { BugService } from '../../service/bug-service';
@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard {
  bugCount = signal<number>(0);

  priorityCount = signal<{ highCount: number; mediumCount: number; lowCount: number }>({
    highCount: 0,
    mediumCount: 0,
    lowCount: 0,
  });

  statusCount = signal<{ openCount: number; inProgressCount: number; resolvedCount: number }>({
    openCount: 0,
    inProgressCount: 0,
    resolvedCount: 0,
  });

  developerCount = signal<
    {
      developer: string;
      bugCount: number;
    }[]
  >([]);

  constructor(private bugService: BugService) {}

  ngOnInit() {
    this.bugService.bugCount().subscribe((data) => {
      this.bugCount.set(data);
    });

    this.bugService.priorityCount().subscribe((data) => {
      this.priorityCount.set(data);
    });

    this.bugService.statusCount().subscribe((data) => {
      this.statusCount.set(data);
    });

    this.bugService.developerCount().subscribe((data) => {
      this.developerCount.set(data);
    });
  }
}
