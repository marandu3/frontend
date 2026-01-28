import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { PortfolioService, Profile } from '../../../services/portfolio.service';
import { CommonModule } from '@angular/common';
import { FallbackImageDirective } from '../../../directives/fallback-image';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, FallbackImageDirective],
  templateUrl: './profile.html',
  styleUrl: './profile.css'
})
export class ProfileComponent implements OnInit {

  profileForm!: FormGroup;
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
      }
    });
  }

  onImageLinkChange() {
    const url: string = this.profileForm.value.profile_image_url;
    if (!url) {
      this.previewImage = null;
      return;
    }

    // Try to load the provided image URL to validate it can be loaded by browser. If load fails, fallback will be used.
    const img = new Image();
    img.onload = () => {
      this.previewImage = url;
    };
    img.onerror = () => {
      this.previewImage = null; // clear preview to let fallback directive show default
    };
    img.src = url;
  }

  saveProfile() {
    const data: Profile = this.profileForm.value;
    // don't allow saving an external profile image URL that doesn't load
    if (data.profile_image_url && !this.previewImage) {
      alert('Provided profile image URL appears to be invalid or unreachable. Please check the URL or remove it.');
      return;
    }
    this.portService.createOrUpdateProfile(data).subscribe({
      next: () => alert('Profile saved successfully!'),
      error: () => alert('Failed to save profile!')
    });
  }
}
