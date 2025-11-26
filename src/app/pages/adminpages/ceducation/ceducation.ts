import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { PortfolioService } from '../../../services/portfolio.service';

@Component({
  selector: 'app-ceducation',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './ceducation.html',
  styleUrl: './ceducation.css'
})
export class Ceducation {

  mode: 'add' | 'edit' | 'delete' = 'add';

  educationForm!: FormGroup;
  educations: any[] = [];
  selectedLevel: string | null = null;

  loading = false;
  submitting = false;

  // Delete confirmation
  confirmDelete = false;
  toDelete: any = null;

  constructor(
    private fb: FormBuilder,
    private portfolio: PortfolioService
  ) {}

  ngOnInit(): void {
    this.buildForm();
    this.loadEducations();
  }

  buildForm() {
    this.educationForm = this.fb.group({
      level: ['', Validators.required],
      institution: ['', Validators.required],
      field_of_study: ['', Validators.required],
      location: ['', Validators.required],
      start_year: ['', Validators.required],
      end_year: ['', Validators.required]
    });
  }

  switchMode(m: 'add' | 'edit' | 'delete') {
    this.mode = m;
    this.educationForm.reset();
    this.selectedLevel = null;
    this.confirmDelete = false;
    this.toDelete = null;
  }

  loadEducations() {
    this.loading = true;
    this.portfolio.getEducations().subscribe({
      next: (res) => {
        this.educations = res;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
      }
    });
  }

  // ADD
  create() {
    if (this.educationForm.invalid) {
      this.educationForm.markAllAsTouched();
      return;
    }

    this.submitting = true;

    this.portfolio.createEducation(this.educationForm.value).subscribe({
      next: () => {
        this.submitting = false;
        this.educationForm.reset();
        this.loadEducations();
      },
      error: () => {
        this.submitting = false;
      }
    });
  }

  // EDIT - Choose an item
  selectForEdit(e: any) {
    this.selectedLevel = e.level;

    this.educationForm.patchValue({
      level: e.level,
      institution: e.institution,
      field_of_study: e.field_of_study,
      location: e.location,
      start_year: e.start_year,
      end_year: e.end_year
    });
  }

  update() {
    if (!this.selectedLevel) return;

    this.submitting = true;

    this.portfolio.updateEducation(this.selectedLevel, this.educationForm.value).subscribe({
      next: () => {
        this.submitting = false;
        this.selectedLevel = null;
        this.educationForm.reset();
        this.loadEducations();
      },
      error: () => {
        this.submitting = false;
      }
    });
  }

  // DELETE
  askDelete(e: any) {
    this.toDelete = e;
    this.confirmDelete = true;
  }

  confirmDeleteAction() {
    if (!this.toDelete) return;

    this.portfolio.deleteEducation(this.toDelete.level).subscribe({
      next: () => {
        this.confirmDelete = false;
        this.toDelete = null;
        this.loadEducations();
      }
    });
  }

  cancelDelete() {
    this.confirmDelete = false;
    this.toDelete = null;
  }
}
