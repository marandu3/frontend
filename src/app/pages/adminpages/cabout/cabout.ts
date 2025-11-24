import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { PortfolioService, Skill } from '../../../services/portfolio.service';

@Component({
  selector: 'app-cabout',
  templateUrl: './cabout.html',
  imports: [CommonModule, ReactiveFormsModule],
  styleUrls: ['./cabout.css']
})
export class Cabout implements OnInit {

  skills: Skill[] = [];
  groupedSkills: { [category: string]: Skill[] } = {};
  loading = true;

  skillForm: FormGroup;
  submitting = false;

  // Predefined categories for the dropdown
  categories: string[] = [
    'Web Development',
    'AI',
    'ML',
    'Programming Languages',
    'UI/UX and Design',
    'IT Concepts'
  ];

  constructor(
    private portfolioService: PortfolioService,
    private fb: FormBuilder
  ) {
    this.skillForm = this.fb.group({
      name: ['', Validators.required],
      icon_url: [''],
      description: [''],
      category: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadSkills();
  }

  loadSkills(): void {
    this.loading = true;
    this.portfolioService.getSkills().subscribe({
      next: (data) => {
        this.skills = data;
        this.groupByCategory();
        this.loading = false;
      },
      error: (err) => {
        console.error('Failed to load skills', err);
        this.loading = false;
      }
    });
  }

  groupByCategory(): void {
    this.groupedSkills = {};
    this.skills.forEach(skill => {
      const cat = skill.category || 'Uncategorized';
      if (!this.groupedSkills[cat]) this.groupedSkills[cat] = [];
      this.groupedSkills[cat].push(skill);
    });
  }

  submitSkill(): void {
    if (this.skillForm.invalid) return;

    this.submitting = true;
    const newSkill: Skill = this.skillForm.value;

    this.portfolioService.createSkill(newSkill).subscribe({
      next: (res) => {
        this.skills.push(res);
        this.groupByCategory();
        this.skillForm.reset();
        this.submitting = false;
      },
      error: (err) => {
        console.error('Failed to add skill', err);
        this.submitting = false;
      }
    });
  }

}
