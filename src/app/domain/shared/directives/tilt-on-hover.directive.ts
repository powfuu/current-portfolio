import { Directive, ElementRef, HostListener, Input, OnInit, PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Directive({
  selector: '[appTiltOnHover]',
  standalone: true,
})
export class TiltOnHoverDirective implements OnInit {
  @Input() tiltIntensity: number = 8;
  @Input() tiltScale: number = 1.02;

  private isBrowser = false;
  private isTouchDevice = false;

  constructor(
    private el: ElementRef,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit(): void {
    this.isBrowser = isPlatformBrowser(this.platformId);
    if (this.isBrowser) {
      this.isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
      const element = this.el.nativeElement as HTMLElement;
      element.style.transition = 'transform 0.3s cubic-bezier(0.03, 0.98, 0.52, 0.99)';
      element.style.transformStyle = 'preserve-3d';
      element.style.willChange = 'transform';
    }
  }

  @HostListener('mousemove', ['$event'])
  onMouseMove(event: MouseEvent): void {
    if (!this.isBrowser || this.isTouchDevice) return;

    const element = this.el.nativeElement as HTMLElement;
    const rect = element.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -this.tiltIntensity;
    const rotateY = ((x - centerX) / centerX) * this.tiltIntensity;

    element.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(${this.tiltScale}, ${this.tiltScale}, ${this.tiltScale})`;
  }

  @HostListener('mouseleave')
  onMouseLeave(): void {
    if (!this.isBrowser || this.isTouchDevice) return;
    const element = this.el.nativeElement as HTMLElement;
    element.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
  }
}
