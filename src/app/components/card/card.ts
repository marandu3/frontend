import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-card',
  imports: [],
  templateUrl: './card.html',
  styleUrl: './card.css'
})
export class Card {
  @Input() title!: string;
  @Input() description!: string;
  @Input() image!: string;
  @Input() progress!: number; // percentage
  @Input() duration!: string; // e.g. "3 months"
}
