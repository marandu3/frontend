import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { PortfolioService } from '../../../services/portfolio.service';
import { CommonModule, SlicePipe } from '@angular/common';

@Component({
  selector: 'app-cprojects',
  standalone: true,
  imports: [ReactiveFormsModule,SlicePipe,CommonModule],
  templateUrl: './cprojects.html',
  styleUrls: ['./cprojects.css']
})
export class Cprojects implements OnInit {

  mode: 'add' | 'edit' | 'delete' = 'add';
  submitting = false;
  projects: any[] = [];

  projectForm!: FormGroup;

  selectedTitle: string | null = null; // for editing

  // delete modal
  confirmDelete = false;
  toDelete: any = null;

  constructor(private fb: FormBuilder, private service: PortfolioService) {}

  ngOnInit() {
    this.setupForm();
    this.loadProjects();
  }

  setupForm() {
    this.projectForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      picture_url: ['', Validators.required],
      github_url: ['', Validators.required],
      live_url: ['', Validators.required],
      start_date: ['', Validators.required],
      end_date: ['', Validators.required],
      technologies: ['', Validators.required] // comma separated input
    });
  }

  switchMode(newMode: 'add' | 'edit' | 'delete') {
    this.mode = newMode;

    // reset edit selections
    this.selectedTitle = null;
    this.confirmDelete = false;

    // refresh
    this.loadProjects();
  }

  loadProjects() {
    this.service.getProjects().subscribe({
      next: (res) => {
        this.projects = res;
      },
      error: (err) => console.error("Failed to load projects", err)
    });
  }

  /** CREATE PROJECT */
  create() {
    if (this.projectForm.invalid) return;

    this.submitting = true;

    const payload = this.preparePayload();

    this.service.createProject(payload).subscribe({
      next: () => {
        this.submitting = false;
        this.projectForm.reset();
        this.loadProjects();
      },
      error: (err) => {
        this.submitting = false;
        console.error("Create failed", err);
      }
    });
  }

  /** WHEN USER CLICKS A PROJECT TO EDIT */
  selectForEdit(project: any) {
    this.selectedTitle = project.title;

    // patch values
    this.projectForm.patchValue({
      title: project.title,
      description: project.description,
      picture_url: project.picture_url,
      github_url: project.github_url,
      live_url: project.live_url,
      start_date: project.start_date,
      end_date: project.end_date,
      technologies: project.technologies.join(', ')
    });
  }

  /** UPDATE PROJECT */
  update() {
    if (!this.selectedTitle) return;
    if (this.projectForm.invalid) return;

    this.submitting = true;

    const payload = this.preparePayload();

    this.service.updateProject(this.selectedTitle, payload).subscribe({
      next: () => {
        this.submitting = false;
        this.selectedTitle = null;
        this.loadProjects();
      },
      error: (err) => {
        this.submitting = false;
        console.error("Update failed", err);
      }
    });
  }

  /** ASK BEFORE DELETE */
  askDelete(project: any) {
    this.toDelete = project;
    this.confirmDelete = true;
  }

  cancelDelete() {
    this.confirmDelete = false;
    this.toDelete = null;
  }

  /** CONFIRM DELETE */
  confirmDeleteAction() {
    if (!this.toDelete) return;

    this.service.deleteProject(this.toDelete.title).subscribe({
      next: () => {
        this.confirmDelete = false;
        this.toDelete = null;
        this.loadProjects();
      },
      error: (err) => console.error("Delete failed", err)
    });
  }

  /** PREPARE PAYLOAD BEFORE SEND */
  preparePayload() {
    const form = this.projectForm.value;

    return {
      ...form,
      technologies: form.technologies
        .split(',')
        .map((t: string) => t.trim())
        .filter((t: string) => t.length > 0)
    };
  }
}
