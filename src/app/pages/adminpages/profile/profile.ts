import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { PortfolioService, Profile } from '../../../services/portfolio.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './profile.html',
  styleUrl: './profile.css'
})
export class ProfileComponent implements OnInit {

  profileForm!: FormGroup;
  loading = true;
  previewImage: string | null = null;

  constructor(
    private fb: FormBuilder,
    private portService: PortfolioService
  ) {}

  ngOnInit() {
    this.profileForm = this.fb.group({
      name: [''],
      title: [''],
      description: [''],
      profile_image_url: [''],
      social_links: this.fb.group({
        github: [''],
        linkedin: [''],
        twitter: [''],
        email: ['']
      })
    });

    this.loadProfile();
  }

  loadProfile() {
    this.portService.getProfile().subscribe({
      next: (res: Profile[]) => {
        if (res.length > 0) {
          const p = res[0];
          this.profileForm.patchValue(p);
          this.previewImage = p.profile_image_url || null;
        }
        this.loading = false;
      },
      error: () => this.loading = false
    });
  }

  onImageSelected(event: any) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      this.previewImage = reader.result as string;
      this.profileForm.patchValue({ profile_image_url: this.previewImage });
    };
    reader.readAsDataURL(file);
  }

  saveProfile() {
    const data: Profile = this.profileForm.value;
    this.portService.createOrUpdateProfile(data).subscribe({
      next: () => alert('Profile saved successfully!'),
      error: () => alert('Failed to save profile!')
    });
  }
}
