import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FallbackImageDirective } from '../../../directives/fallback-image';
import { PortfolioService, Skill } from '../../../services/portfolio.service';

@Component({
  selector: 'app-cabout',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FallbackImageDirective],
  templateUrl: './cabout.html',
  styleUrls: ['./cabout.css']
})
export class Cabout implements OnInit {

  skills: Skill[] = [];
  mode: 'add' | 'edit' | 'delete' = 'add';

  skillForm!: FormGroup;
  submitting = false;
  previewIcon: string | null = null;

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
    if (payload.icon_url && !this.previewIcon) {
      alert('Provided skill icon URL appears to be invalid or unreachable. Please check the URL or remove it.');
      this.submitting = false;
      return;
    }

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
    this.previewIcon = skill.icon_url || null;
  }

  onIconInputChange() {
    const url = this.skillForm.value.icon_url;
    if (!url) { this.previewIcon = null; return; }
    const img = new Image();
    img.onload = () => this.previewIcon = url;
    img.onerror = () => this.previewIcon = null;
    img.src = url;
  }

  updateSkill() {
    if (!this.editSkill) return;
    if (this.skillForm.invalid) return;

    this.submitting = true;
    const payload = this.skillForm.value;
    if (payload.icon_url && !this.previewIcon) {
      alert('Provided skill icon URL appears to be invalid or unreachable. Please check the URL or remove it.');
      this.submitting = false;
      return;
    }

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
    const skillName = this.toDelete.name;
    console.log('Attempting to delete skill:', skillName);

    this.portfolio.deleteSkill(skillName).subscribe({
      next: () => {
        this.confirmDelete = false;
        this.submitting = false;
        this.toDelete = null;
        alert('Skill deleted successfully');
        this.loadSkills();
      },
      error: err => {
        this.submitting = false;
        console.error('Failed to delete skill - Status:', err.status, 'Error:', err);
        alert('Failed to delete skill. Status: ' + err.status + '. Check console for details.');
      }
    });
  }

}
