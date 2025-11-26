import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { PortfolioService, Skill } from '../../../services/portfolio.service';

@Component({
  selector: 'app-cabout',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './cabout.html',
  styleUrls: ['./cabout.css']
})
export class Cabout implements OnInit {

  skills: Skill[] = [];
  mode: 'add' | 'edit' | 'delete' = 'add';

  skillForm!: FormGroup;
  submitting = false;

  editSkill: Skill | null = null;       // Selected skill to edit
  confirmDelete = false;                 // Delete modal visibility
  toDelete: Skill | null = null;         // Selected skill to delete

  categories: string[] = [
    'Web Development',
    'AI',
    'ML',
    'Programming Languages',
    'UI/UX and Design',
    'IT Concepts'
  ];

  constructor(private fb: FormBuilder, private portfolio: PortfolioService) {}

  ngOnInit(): void {
    this.skillForm = this.fb.group({
      name: ['', Validators.required],
      icon_url: [''],
      description: [''],
      category: ['', Validators.required]
    });

    this.loadSkills();
  }

  switchMode(m: 'add' | 'edit' | 'delete') {
    this.mode = m;
    this.editSkill = null;
    this.confirmDelete = false;
    this.skillForm.reset();
  }

  loadSkills() {
    this.portfolio.getSkills().subscribe({
      next: res => this.skills = res,
      error: err => console.error('Failed loading skills', err)
    });
  }

  /** ADD SKILL */
  submitSkill() {
    if (this.skillForm.invalid) return;

    this.submitting = true;
    const payload: Skill = this.skillForm.value;

    this.portfolio.createSkill(payload).subscribe({
      next: skill => {
        this.skills.push(skill);
        this.skillForm.reset();
        this.submitting = false;
      },
      error: err => {
        console.error('Failed to add skill', err);
        this.submitting = false;
      }
    });
  }

  /** EDIT */
  selectSkillToEdit(skill: Skill) {
    this.editSkill = skill;

    this.skillForm.setValue({
      name: skill.name,
      icon_url: skill.icon_url || '',
      description: skill.description || '',
      category: skill.category || ''
    });
  }

  updateSkill() {
    if (!this.editSkill) return;
    if (this.skillForm.invalid) return;

    this.submitting = true;

    this.portfolio.updateSkill(this.editSkill.name, this.skillForm.value).subscribe({
      next: () => {
        this.loadSkills();
        this.editSkill = null;
        this.submitting = false;
      },
      error: err => {
        console.error('Failed to update skill', err);
        this.submitting = false;
      }
    });
  }

  /** DELETE */
  askDelete(skill: Skill) {
    this.toDelete = skill;
    this.confirmDelete = true;
  }

  cancelDelete() {
    this.toDelete = null;
    this.confirmDelete = false;
  }

  confirmDeleteAction() {
    if (!this.toDelete) return;

    this.submitting = true;

    this.portfolio.deleteSkill(this.toDelete.name).subscribe({
      next: () => {
        this.confirmDelete = false;
        this.submitting = false;
        this.toDelete = null;
        this.loadSkills();
      },
      error: err => {
        console.error('Failed to delete skill', err);
        this.submitting = false;
      }
    });
  }

}
