import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-techcard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './techcard.html',
  styleUrl: './techcard.css'
})
export class Techcard {

  @Input() category!: string;
  @Input() skills: string[] = [];

  // Map category to emoji/icon (can swap with lucide-icons or Heroicons later)
  categoryIcons: Record<string, string> = {
    "Programming Languages": "💻",
    "Web": "🌐",
    "Hardware": "🔧",
    "Database": "🗄️",
    "Mobile Development": "📱"
  };

  get icon(): string {
    return this.categoryIcons[this.category] || "✨"; // default icon
  }
}
