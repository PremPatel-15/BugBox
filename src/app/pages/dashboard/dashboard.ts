import { Component } from '@angular/core';
import { BugService } from '../../service/bug-service';
import { AsyncPipe, CommonModule } from '@angular/common';
import { BaseChartDirective } from 'ng2-charts';
import { filter, map } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [AsyncPipe, BaseChartDirective, CommonModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard {
  chartData$;

  constructor(private bugService: BugService) {
    this.chartData$ = this.bugService.getAllBug().pipe(
      map((bugs) => {
        if (!bugs || bugs.length === 0) {
          return {
            labels: [],
            datasets: [{ data: [], backgroundColor: [] }],
          };
        }

        return {
          labels: ['Open', 'In Progress', 'Resolved'],
          datasets: [
            {
              data: [
                bugs.filter((b) => b.status === 'Open').length,
                bugs.filter((b) => b.status === 'In Progress').length,
                bugs.filter((b) => b.status === 'Resolved').length,
              ],
              backgroundColor: ['#e76f51', '#e9c46a', '#2a9d8f'],
            },
          ],
        };
      }),
    );
  }
}
