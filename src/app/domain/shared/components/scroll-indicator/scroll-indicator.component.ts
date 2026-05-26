import {
  Component,
  OnInit,
  OnDestroy,
  AfterViewInit,
  NgZone,
  inject,
  PLATFORM_ID,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-scroll-indicator',
  standalone: true,
  imports: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="scroll-indicator" [class.visible]="progress > 1" aria-hidden="true">
      <div class="track">
        <div class="fill" [style.height.%]="progress"></div>
        <div class="thumb" [style.top.%]="progress">
          <div class="thumb-dot"></div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    :host {
      pointer-events: none;
    }

    .scroll-indicator {
      position: fixed;
      right: 18px;
      top: 50%;
      transform: translateY(-50%);
      z-index: 9000;
      display: flex;
      align-items: center;
      gap: 6px;
      opacity: 0;
      transition: opacity 0.5s cubic-bezier(0.16, 1, 0.3, 1);
      pointer-events: none;
    }

    .scroll-indicator.visible {
      opacity: 1;
    }

    .track {
      position: relative;
      width: 3px;
      height: 120px;
      border-radius: 10px;
      background: rgba(var(--primary-rgb), 0.08);
      overflow: visible;
    }

    .fill {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      border-radius: 10px;
      background: linear-gradient(180deg, var(--green), var(--cyan));
      box-shadow: 0 0 6px rgba(var(--primary-rgb), 0.5);
      transition: height 0.12s linear;
      min-height: 4px;
    }

    .thumb {
      position: absolute;
      left: 50%;
      transform: translate(-50%, -50%);
      transition: top 0.12s linear;
    }

    .thumb-dot {
      width: 10px;
      height: 10px;
      border-radius: 50%;
      background: var(--green);
      box-shadow: 0 0 8px rgba(var(--primary-rgb), 0.9),
                  0 0 16px rgba(var(--primary-rgb), 0.4);
      animation: thumb-pulse 2s ease-in-out infinite;
    }

    @keyframes thumb-pulse {
      0%, 100% { box-shadow: 0 0 8px rgba(var(--primary-rgb), 0.9), 0 0 16px rgba(var(--primary-rgb), 0.4); transform: scale(1); }
      50% { box-shadow: 0 0 12px rgba(var(--primary-rgb), 1), 0 0 24px rgba(var(--primary-rgb), 0.6); transform: scale(1.2); }
    }

    .percent-label {
      position: absolute;
      left: 14px;
      transform: translateY(-50%);
      transition: top 0.12s linear;
      font-size: 9px;
      font-weight: 700;
      color: var(--green);
      letter-spacing: 0.05em;
      white-space: nowrap;
      opacity: 0.8;
      text-shadow: 0 0 8px rgba(var(--primary-rgb), 0.5);
    }

    .pct {
      font-size: 7px;
      opacity: 0.7;
    }

    :host-context(.light) .track {
      background: rgba(13, 148, 136, 0.1);
    }

    :host-context(.light) .fill {
      background: linear-gradient(180deg, var(--important), var(--cyan));
      box-shadow: 0 0 6px rgba(13, 148, 136, 0.5);
    }

    :host-context(.light) .thumb-dot {
      background: var(--important);
      box-shadow: 0 0 8px rgba(13, 148, 136, 0.9), 0 0 16px rgba(13, 148, 136, 0.4);
    }

    :host-context(.light) .thumb-dot {
      animation: thumb-pulse-light 2s ease-in-out infinite;
    }

    @keyframes thumb-pulse-light {
      0%, 100% { box-shadow: 0 0 8px rgba(13, 148, 136, 0.9), 0 0 16px rgba(13, 148, 136, 0.4); transform: scale(1); }
      50% { box-shadow: 0 0 12px rgba(13, 148, 136, 1), 0 0 24px rgba(13, 148, 136, 0.6); transform: scale(1.2); }
    }

    :host-context(.light) .percent-label {
      color: var(--important);
      text-shadow: 0 0 8px rgba(13, 148, 136, 0.5);
    }

    @media (max-width: 500px) {
      .scroll-indicator {
        right: 8px;
      }
      .track {
        height: 80px;
      }
      .percent-label {
        display: none;
      }
    }
  `],
})
export class ScrollIndicatorComponent implements OnInit, AfterViewInit, OnDestroy {
  progress = 0;
  progressInt = 0;

  private platformId = inject(PLATFORM_ID);
  private cdr = inject(ChangeDetectorRef);
  private onScroll!: () => void;

  constructor(private ngZone: NgZone) {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    if (!isPlatformBrowser(this.platformId)) return;

    this.ngZone.runOutsideAngular(() => {
      this.onScroll = () => {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const p = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
        this.ngZone.run(() => {
          this.progress = Math.min(100, Math.max(0, p));
          this.progressInt = Math.round(this.progress);
          this.cdr.markForCheck();
        });
      };

      window.addEventListener('scroll', this.onScroll, { passive: true });
    });
  }

  ngOnDestroy(): void {
    if (isPlatformBrowser(this.platformId) && this.onScroll) {
      window.removeEventListener('scroll', this.onScroll);
    }
  }
}
