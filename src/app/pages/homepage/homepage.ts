
import { Component, OnInit } from '@angular/core';
import { PortfolioService, Profile } from '../../services/portfolio.service';
import { CommonModule, NgForOf, NgIf } from '@angular/common';
import { FallbackImageDirective } from '../../directives/fallback-image';

interface SocialMedia {
  name: string;
  url: string;
  iconUrl: string;
}

@Component({
  selector: 'app-homepage',
  standalone: true,
  imports: [CommonModule, NgForOf, NgIf, FallbackImageDirective],
  templateUrl: './homepage.html',
})
export class Homepage implements OnInit {
  profile: Profile | null = null;
  socialMedia: SocialMedia[] = [];
  photoModalVisible = false;

  defaultIcons: Record<string, string> = {
    github: '/github.png',
    linkedin: '/linkedin.png',
    twitter: '/twitter.png',
    email: '/gmail.png'
  };

  constructor(private portfolioService: PortfolioService) {}

  ngOnInit(): void {
    this.loadProfile();
  }

  loadProfile() {
    this.portfolioService.getProfile().subscribe({
      next: (data) => {
        if (!data || data.length === 0) return;

        const prof = data[0];
        this.profile = prof;

        // ONLY SHOW SOCIALS WITH VALUES
        this.socialMedia = Object.entries(prof.social_links || {})
          .filter(([_, value]) => value && value !== '')
          .map(([key, value]) => ({
            name: key,
            url: value as string,
            iconUrl: this.defaultIcons[key.toLowerCase()] || '/github.png'
          }));
      }
    });
  }

  openPhotoModal() {
    if (this.profile?.profile_image_url) this.photoModalVisible = true;
  }

  closePhotoModal() {
    this.photoModalVisible = false;
  }
}
