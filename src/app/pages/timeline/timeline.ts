import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PortfolioService } from '../../services/portfolio.service';

@Component({
  selector: 'app-timeline',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './timeline.html',
  styleUrl: './timeline.css'
})
export class Timeline implements OnInit {

  timeline: any[] = [];
  loading = true;

  constructor(private portfolioService: PortfolioService) {}

  ngOnInit(): void {
    this.loadTimeline();
  }

  loadTimeline() {
    this.portfolioService.getTimelineEvents().subscribe({
      next: (data) => {
        this.timeline = data;
        this.loading = false;
      },
      error: (err) => {
        console.error("Timeline load failed", err);
        this.loading = false;
      }
    });
  }

  chooseIcon(title: string): string {
    const t = title.toLowerCase();

    if (t.includes("school") || t.includes("university") || t.includes("education"))
      return "pi pi-graduation-cap";

    if (t.includes("intern") || t.includes("training") || t.includes("attachment"))
      return "pi pi-briefcase";

    if (t.includes("job") || t.includes("work") || t.includes("position"))
      return "pi pi-building";

    if (t.includes("project") || t.includes("development"))
      return "pi pi-code";

    if (t.includes("personal") || t.includes("life"))
      return "pi pi-user";

    return "pi pi-calendar";
  }

}
