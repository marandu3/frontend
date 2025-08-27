import { Directive, ElementRef, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Directive({
  selector: '[scrollSpy]',
  standalone: true // ✅ since you are using standalone components
})
export class ScrollSpyDirective implements OnInit {
  @Input('scrollSpy') sectionId!: string;

  constructor(private el: ElementRef, private router: Router) {}

  ngOnInit(): void {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // ✅ Update URL without reloading
            this.router.navigate([this.sectionId], { replaceUrl: true });
          }
        });
      },
      { threshold: 0.6 } // 60% of section must be visible
    );

    observer.observe(this.el.nativeElement);
  }
}
