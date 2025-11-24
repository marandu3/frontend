import { Component, OnInit } from '@angular/core';
import { PortfolioService, Skill } from '../../services/portfolio.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './about.html',
  styleUrls: ['./about.css']
})
export class About implements OnInit {

  groupedSkills: Record<string, Skill[]> = {};
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

  private groupSkillsByCategory(skills: Skill[]) {
    this.groupedSkills = skills.reduce((acc: Record<string, Skill[]>, skill) => {
      const category = skill.category || 'Uncategorized';
      if (!acc[category]) acc[category] = [];
      acc[category].push(skill);
      return acc;
    }, {});
  }

  trackByCategory(index: number, key: string) {
    return key;
  }
}
