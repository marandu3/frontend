import { Component, OnInit } from '@angular/core';
import { PortfolioService } from '../../services/portfolio.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './about.html',
  styleUrl: './about.css'
})
export class About implements OnInit {

  groupedSkills: any = {};
  loading = true;

  constructor(private portfolioService: PortfolioService) {}

  ngOnInit(): void {
    this.loadSkills();
  }

  loadSkills() {
    this.loading = true;

    this.portfolioService.getSkills().subscribe({
      next: (data) => {
        this.groupSkillsByCategory(data);
        this.loading = false;
      },
      error: (err) => {
        console.error("Failed to load skills", err);
        this.loading = false;
      }
    });
  }

  groupSkillsByCategory(skills: any[]) {
    this.groupedSkills = skills.reduce((acc, skill) => {
      if (!acc[skill.category]) {
        acc[skill.category] = [];
      }
      acc[skill.category].push(skill);
      return acc;
    }, {});
  }

  trackByCategory(index: number, key: string) {
    return key;
  }
}
