import { ChangeDetectorRef, Component, inject, PLATFORM_ID, signal } from '@angular/core';
import { BugService } from '../../service/bug-service';
import { isPlatformBrowser } from '@angular/common';
import { ChartModule } from 'primeng/chart';
@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [ChartModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard {
  basicData: any;
  basicOptions: any;
  platformId = inject(PLATFORM_ID);

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

  constructor(
    private bugService: BugService,
    private cd: ChangeDetectorRef,
  ) {}

  ngOnInit() {
    this.bugService.bugCount().subscribe((data) => {
      this.bugCount.set(data);
    });

    this.bugService.priorityCount().subscribe((data) => {
      this.priorityCount.set({
        highCount: Number(data.highCount),
        mediumCount: Number(data.mediumCount),
        lowCount: Number(data.lowCount),
      });

      this.initChart();
    });

    this.bugService.statusCount().subscribe((data) => {
      this.statusCount.set(data);
    });

    this.bugService.developerCount().subscribe((data) => {
      this.developerCount.set(data);
    });
  }

  initChart() {
    if (isPlatformBrowser(this.platformId)) {
      const documentStyle = getComputedStyle(document.documentElement);
      const textColor = documentStyle.getPropertyValue('--p-text-color');
      const textColorSecondary = documentStyle.getPropertyValue('--p-text-muted-color');
      const surfaceBorder = documentStyle.getPropertyValue('--p-content-border-color');

      this.basicData = {
        labels: ['High', 'Medium', 'Low'],
        datasets: [
          {
            label: 'Priority Wise Count',
            data: [
              this.priorityCount().highCount,
              this.priorityCount().mediumCount,
              this.priorityCount().lowCount,
            ],
            backgroundColor: [
              'rgba(239, 68, 68, 0.5)', // High
              'rgba(245, 158, 11, 0.5)', // Medium
              'rgba(34, 197, 94, 0.5)', // Low
            ],
            borderColor: ['rgb(220, 38, 38)', 'rgb(217, 119, 6)', 'rgb(22, 163, 74)'],
            borderWidth: 1,
          },
        ],
      };

      this.basicOptions = {
        maintainAspectRatio: false,
        aspectRatio: 0.8,
        plugins: {
          legend: {
            labels: {
              color: textColor,
            },
          },
        },
        scales: {
          x: {
            ticks: {
              color: textColorSecondary,
            },
            grid: {
              color: surfaceBorder,
            },
          },
          y: {
            beginAtZero: true,
            ticks: {
              color: textColorSecondary,
            },
            grid: {
              color: surfaceBorder,
            },
          },
        },
      };
      this.cd.markForCheck();
    }
  }
}
