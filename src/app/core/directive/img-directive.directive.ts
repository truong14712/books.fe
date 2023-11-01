import { Directive, ElementRef } from '@angular/core';

// eslint-disable-next-line @angular-eslint/directive-selector
@Directive({ selector: 'img' })
export class ImgDirectiveDirective {
  constructor({ nativeElement }: ElementRef<HTMLImageElement>) {
    const supports = 'loading' in HTMLImageElement.prototype;

    if (supports) {
      nativeElement.setAttribute('loading', 'lazy');
    } else {
      // fallback to IntersectionObserver
    }
  }
}
