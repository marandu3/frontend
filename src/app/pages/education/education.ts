import { Component, OnInit } from '@angular/core';
import { PortfolioService, Education as EduModel } from '../../services/portfolio.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-education',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './education.html',
  styleUrl: './education.css'
})
export class Education implements OnInit {

  educations: EduModel[] = [];
  loading = true;

  constructor(private portfolioService: PortfolioService) {}

  ngOnInit(): void {
    this.loadEducation();
  }

  loadEducation() {
    this.loading = true;

    this.portfolioService.getEducations().subscribe({
      next: (data) => {
        this.educations = data;
        this.loading = false;
      },
      error: (err) => {
        console.error("Failed to load education", err);
        this.loading = false;
      }
    });
  }
}
