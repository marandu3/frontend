import { Component, OnInit } from '@angular/core';
import { PortfolioService, Profile } from '../../services/portfolio.service';
import { CommonModule } from '@angular/common';

interface SocialMedia {
  name: string;
  url: string;
  iconUrl?: string; // optional, can be fetched from a default mapping
}

@Component({
  selector: 'app-homepage',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './homepage.html',
})
export class Homepage implements OnInit {
  profile: Profile | null = null;
  socialMedia: SocialMedia[] = [];
  photoModalVisible = false;
  loading = true;

  // Default icon mapping for known platforms
  defaultIcons: Record<string, string> = {
    linkedin: 'assets/icons/linkedin.png',
    github: 'assets/icons/github.png',
    whatsapp: 'assets/icons/whatsapp.png',
    email: 'assets/icons/email.png',
  };

  constructor(private portfolioService: PortfolioService) {}

  ngOnInit(): void {
    this.loadProfile();
  }

  loadProfile() {
    this.loading = true;
    this.portfolioService.getProfile().subscribe({
      next: (data) => {
        if (data && data.length > 0) {
          const prof = data[0];
          this.profile = {
            ...prof,
            // fallback fields if needed
            description: prof.description || '',
          };

          // Convert social_links dict to array
          this.socialMedia = prof.social_links
            ? Object.entries(prof.social_links).map(([key, value]) => ({
                name: key,
                url: value as string,
                iconUrl: this.defaultIcons[key.toLowerCase()] || 'assets/icons/default.png',
              }))
            : [];
        }
        this.loading = false;
      },
      error: () => {
        this.profile = null;
        this.socialMedia = [];
        this.loading = false;
      },
    });
  }

  openPhotoModal() {
    if (this.profile?.profile_image_url) this.photoModalVisible = true;
  }

  closePhotoModal() {
    this.photoModalVisible = false;
  }
}
