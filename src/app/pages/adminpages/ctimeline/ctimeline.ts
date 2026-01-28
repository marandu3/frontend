import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { PortfolioService, TimelineEvent } from '../../../services/portfolio.service';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-ctimeline',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './ctimeline.html',
  styleUrls: ['./ctimeline.css']
})
export class Ctimeline implements OnInit {

  mode: 'add' | 'edit' | 'delete' = 'add';
  timelineForm: FormGroup;
  events: TimelineEvent[] = [];
  selectedTitle: string | null = null;
  submitting = false;

  confirmDelete = false;
  toDelete: TimelineEvent | null = null;

  constructor(private fb: FormBuilder, private service: PortfolioService) {
    this.timelineForm = this.fb.group({
      title: [''],
      description: [''],
      start_date: [''],
      end_date: [''],
      location: ['']
    });
  }

  ngOnInit() {
    this.loadEvents();
  }

  switchMode(mode: 'add' | 'edit' | 'delete') {
    this.mode = mode;
    this.selectedTitle = null;
    this.confirmDelete = false;
    this.timelineForm.reset();
  }

  loadEvents() {
    this.service.getTimelineEvents().subscribe(res => this.events = res);
  }

  create() {
    if (!this.timelineForm.valid) return;
    this.submitting = true;
    this.service.createTimelineEvent(this.timelineForm.value).subscribe(() => {
      this.submitting = false;
      this.timelineForm.reset();
      this.loadEvents();
    });
  }

  selectForEdit(event: TimelineEvent) {
    this.selectedTitle = event.title;
    this.timelineForm.patchValue(event);
  }

  update() {
    if (!this.selectedTitle || !this.timelineForm.valid) return;
    this.submitting = true;
    this.service.updateTimelineEvent(this.selectedTitle, this.timelineForm.value).subscribe(() => {
      this.submitting = false;
      this.selectedTitle = null;
      this.timelineForm.reset();
      this.loadEvents();
    });
  }

  askDelete(event: TimelineEvent) {
    this.toDelete = event;
    this.confirmDelete = true;
  }

  cancelDelete() {
    this.toDelete = null;
    this.confirmDelete = false;
  }

  confirmDeleteAction() {
    if (!this.toDelete) return;
    
    this.submitting = true;
    const title = this.toDelete.title;
    console.log('Attempting to delete timeline event:', title);
    
    this.service.deleteTimelineEvent(title).subscribe({
      next: () => {
        this.submitting = false;
        this.confirmDelete = false;
        this.toDelete = null;
        alert('Event deleted successfully');
        this.loadEvents();
      },
      error: (err) => {
        this.submitting = false;
        console.error('Failed to delete event - Status:', err.status, 'Error:', err);
        alert('Failed to delete event. Status: ' + err.status + '. Check console for details.');
      }
    });
  }

}
