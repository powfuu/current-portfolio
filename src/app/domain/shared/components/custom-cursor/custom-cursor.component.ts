import {
  Component,
  OnDestroy,
  AfterViewInit,
  NgZone,
  inject,
  PLATFORM_ID,
  ElementRef,
  ViewChild,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-custom-cursor',
  standalone: true,
  imports: [],
  template: `
    <div class="cursor-trail-container" aria-hidden="true">
      <div class="trail-wrap" #trailWrap></div>
      <div class="cursor-dot" #cursorDot>
        <div class="cursor-ring" #cursorRing></div>
        <div class="cursor-center" #cursorCenter></div>
      </div>
    </div>
  `,
  styles: [`
    .cursor-trail-container {
      position: fixed;
      inset: 0;
      pointer-events: none !important;
      z-index: 2147483647;
      overflow: hidden;
    }

    :host ::ng-deep .trail-dot {
      position: fixed;
      width: 6px;
      height: 6px;
      border-radius: 50%;
      background: var(--green, #64ffdb);
      pointer-events: none !important;
      will-change: transform, opacity;
    }

    .cursor-dot {
      position: fixed;
      pointer-events: none !important;
      will-change: left, top;
      top: 0;
      left: 0;
    }

    .cursor-ring {
      position: absolute;
      width: 36px;
      height: 36px;
      border: 1.5px solid rgba(var(--primary-rgb), 0.6);
      border-radius: 50%;
      transform: translate(-50%, -50%);
      pointer-events: none !important;
      transition: width 0.22s cubic-bezier(0.16,1,0.3,1),
                  height 0.22s cubic-bezier(0.16,1,0.3,1),
                  border-color 0.22s ease,
                  background 0.22s ease,
                  box-shadow 0.22s ease;
    }

    .cursor-center {
      position: absolute;
      width: 5px;
      height: 5px;
      background: var(--green, #64ffdb);
      border-radius: 50%;
      transform: translate(-50%, -50%);
      pointer-events: none !important;
      box-shadow: 0 0 6px rgba(var(--primary-rgb),0.8);
      transition: width 0.12s ease, height 0.12s ease, box-shadow 0.12s ease;
    }

    .cursor-dot.hovering .cursor-ring {
      width: 52px;
      height: 52px;
      border-color: rgba(var(--primary-rgb), 0.9);
      background: rgba(var(--primary-rgb),0.04);
      box-shadow: 0 0 20px rgba(var(--primary-rgb),0.15);
    }

    .cursor-dot.hovering .cursor-center {
      width: 8px;
      height: 8px;
      box-shadow: 0 0 12px rgba(var(--primary-rgb),1);
    }

    .cursor-dot.clicking .cursor-ring {
      width: 22px;
      height: 22px;
      border-color: rgba(6, 182, 212, 0.9);
      background: rgba(6,182,212,0.12);
    }

    .cursor-dot.clicking .cursor-center {
      width: 10px;
      height: 10px;
    }

    .cursor-dot.idle .cursor-ring {
      animation: idle-pulse 2.5s ease-in-out infinite;
    }

    .cursor-dot.idle .cursor-center {
      animation: idle-center 2.5s ease-in-out infinite;
    }

    @keyframes idle-pulse {
      0%, 100% {
        width: 36px;
        height: 36px;
        border-color: rgba(var(--primary-rgb), 0.35);
        box-shadow: none;
      }
      50% {
        width: 54px;
        height: 54px;
        border-color: rgba(var(--primary-rgb), 0.7);
        box-shadow: 0 0 18px rgba(var(--primary-rgb), 0.18);
      }
    }

    @keyframes idle-center {
      0%, 100% {
        width: 5px;
        height: 5px;
        box-shadow: 0 0 6px rgba(var(--primary-rgb), 0.6);
      }
      50% {
        width: 7px;
        height: 7px;
        box-shadow: 0 0 14px rgba(var(--primary-rgb), 1);
      }
    }

    @media (pointer: coarse) {
      .cursor-trail-container { display: none; }
    }
  `],
})
export class CustomCursorComponent implements AfterViewInit, OnDestroy {
  @ViewChild('cursorDot') dotRef!: ElementRef<HTMLElement>;
  @ViewChild('cursorRing') ringRef!: ElementRef<HTMLElement>;
  @ViewChild('trailWrap') trailWrapRef!: ElementRef<HTMLElement>;

  private readonly TRAIL_LENGTH = 16;
  private trailDots: HTMLElement[] = [];
  private positions: { x: number; y: number }[] = [];

  // mouse = exact position; ring lerps behind for smooth feel
  private mouseX = -200;
  private mouseY = -200;
  private ringX = -200;
  private ringY = -200;

  private listeners: Array<() => void> = [];
  private platformId = inject(PLATFORM_ID);
  private rafId = 0;
  private idleTimer = 0;
  private _isIdle = false;
  private isDark = true;

  constructor(private ngZone: NgZone) {}

  ngAfterViewInit(): void {
    if (!isPlatformBrowser(this.platformId)) return;
    if (window.matchMedia('(pointer: coarse)').matches) return;

    this.isDark = !document.body.classList.contains('light');
    new MutationObserver(() => {
      this.isDark = !document.body.classList.contains('light');
      this.rebuildTrailOpacity();
    }).observe(document.body, { attributes: true, attributeFilter: ['class'] });

    this.buildTrail();

    this.ngZone.runOutsideAngular(() => {
      this.positions = Array.from({ length: this.TRAIL_LENGTH }, () => ({ x: -200, y: -200 }));

      const dot = this.dotRef.nativeElement;

      const onMove = (e: MouseEvent) => {
        this.mouseX = e.clientX;
        this.mouseY = e.clientY;
        this.positions.unshift({ x: e.clientX, y: e.clientY });
        if (this.positions.length > this.TRAIL_LENGTH) this.positions.pop();

        const target = e.target as HTMLElement;
        const hoverable = target.closest(
          'a, button, [appTiltOnHover], .social-icon, input, select, textarea, label, [role="button"]'
        );
        dot.classList.toggle('hovering', !!hoverable);
        dot.classList.remove('idle');
        this._isIdle = false;
        clearTimeout(this.idleTimer);
        this.idleTimer = window.setTimeout(() => {
          this._isIdle = true;
          dot.classList.add('idle');
        }, 1000);
      };

      const onDown = () => dot.classList.add('clicking');
      const onUp = () => dot.classList.remove('clicking');
      const onLeave = () => {
        this.mouseX = -200;
        this.mouseY = -200;
        dot.classList.remove('hovering', 'clicking', 'idle');
      };

      document.addEventListener('mousemove', onMove, { passive: true });
      document.addEventListener('mousedown', onDown, { passive: true });
      document.addEventListener('mouseup', onUp, { passive: true });
      document.addEventListener('mouseleave', onLeave, { passive: true });

      this.listeners.push(
        () => document.removeEventListener('mousemove', onMove),
        () => document.removeEventListener('mousedown', onDown),
        () => document.removeEventListener('mouseup', onUp),
        () => document.removeEventListener('mouseleave', onLeave),
      );

      this.rafId = requestAnimationFrame(() => this.renderLoop());
    });
  }

  private trailMaxOpacity(): number {
    return this.isDark ? 0.4 : 0.78;
  }

  private buildTrail(): void {
    const wrap = this.trailWrapRef.nativeElement;
    this.trailDots = Array.from({ length: this.TRAIL_LENGTH }, (_, i) => {
      const el = document.createElement('div');
      el.className = 'trail-dot';
      el.style.opacity = String((1 - i / this.TRAIL_LENGTH) * this.trailMaxOpacity());
      el.style.left = '-200px';
      el.style.top = '-200px';
      wrap.appendChild(el);
      return el;
    });
  }

  private rebuildTrailOpacity(): void {
    const max = this.trailMaxOpacity();
    this.trailDots.forEach((el, i) => {
      el.style.opacity = String((1 - i / this.TRAIL_LENGTH) * max);
    });
  }

  private renderLoop(): void {
    // ring lerps behind mouse for smooth feel; dot center is exact mouse pos
    const ease = 0.14;
    this.ringX += (this.mouseX - this.ringX) * ease;
    this.ringY += (this.mouseY - this.ringY) * ease;

    const dot = this.dotRef.nativeElement;
    // dot wrapper at exact mouse pos — zero lag on center
    dot.style.left = this.mouseX + 'px';
    dot.style.top = this.mouseY + 'px';
    // ring offset = difference between ring lerp pos and mouse pos
    const ring = this.ringRef.nativeElement;
    ring.style.transform = `translate(calc(-50% + ${this.ringX - this.mouseX}px), calc(-50% + ${this.ringY - this.mouseY}px))`;

    for (let i = 0; i < this.trailDots.length; i++) {
      const p = this.positions[i];
      if (p) {
        this.trailDots[i].style.left = p.x + 'px';
        this.trailDots[i].style.top = p.y + 'px';
      }
    }

    this.rafId = requestAnimationFrame(() => this.renderLoop());
  }

  ngOnDestroy(): void {
    this.listeners.forEach(fn => fn());
    cancelAnimationFrame(this.rafId);
    clearTimeout(this.idleTimer);
  }
}
