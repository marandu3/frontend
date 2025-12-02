import { Directive, HostListener, Input, ElementRef } from '@angular/core';

@Directive({
  selector: '[fallbackImage]',
  standalone: true
})
export class FallbackImageDirective {
  @Input('fallbackImage') fallbackImage: string = '/profile.jpeg';

  constructor(private el: ElementRef<HTMLImageElement>) {}

  @HostListener('error')
  onError() {
    const img = this.el.nativeElement as HTMLImageElement;
    if (!this.fallbackImage) return;
    // set fallback only if different to avoid infinite loop
    if (img.src !== this.fallbackImage) {
      img.src = this.fallbackImage;
    }
  }
}
