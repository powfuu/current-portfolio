import {
  Directive,
  ElementRef,
  OnInit,
  Input,
  HostListener,
  inject,
  PLATFORM_ID,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

const GLITCH_CHARS = '!<>-_\\/[]{}—=+*^?#$@&%~ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

@Directive({
  selector: '[appGlitchText]',
  standalone: true,
})
export class GlitchTextDirective implements OnInit {
  @Input() appGlitchText: string = '';
  @Input() glitchOnHover: boolean = false;
  @Input() glitchDuration: number = 900;

  private originalText: string = '';
  private animId: any;
  private isAnimating = false;
  private platformId = inject(PLATFORM_ID);

  constructor(private el: ElementRef) {}

  ngOnInit(): void {
    if (!isPlatformBrowser(this.platformId)) return;
    this.originalText = this.appGlitchText || this.el.nativeElement.textContent || '';
    if (!this.glitchOnHover) {
      // auto run on init with delay
      setTimeout(() => this.runGlitch(), 400);
    }
  }

  @HostListener('mouseenter')
  onMouseEnter(): void {
    if (this.glitchOnHover && !this.isAnimating) this.runGlitch();
  }

  runGlitch(): void {
    if (!isPlatformBrowser(this.platformId)) return;
    this.isAnimating = true;
    const el = this.el.nativeElement as HTMLElement;
    const text = this.originalText;
    const duration = this.glitchDuration;
    const start = performance.now();
    let revealed = 0;

    const tick = (now: number) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      revealed = Math.floor(progress * text.length);

      let output = '';
      for (let i = 0; i < text.length; i++) {
        if (text[i] === ' ') {
          output += ' ';
        } else if (i < revealed) {
          output += `<span style="color:var(--green)">${text[i]}</span>`;
        } else {
          // scramble
          if (Math.random() < 0.4) {
            output += `<span style="opacity:0.4;color:var(--cyan)">${GLITCH_CHARS[Math.floor(Math.random() * GLITCH_CHARS.length)]}</span>`;
          } else {
            output += `<span style="opacity:0.2">${GLITCH_CHARS[Math.floor(Math.random() * GLITCH_CHARS.length)]}</span>`;
          }
        }
      }

      el.innerHTML = output;

      if (progress < 1) {
        this.animId = requestAnimationFrame(tick);
      } else {
        // settle — restore clean with green color
        el.innerHTML = `<span style="color:var(--green)">${text}</span>`;
        this.isAnimating = false;
      }
    };

    cancelAnimationFrame(this.animId);
    this.animId = requestAnimationFrame(tick);
  }
}
