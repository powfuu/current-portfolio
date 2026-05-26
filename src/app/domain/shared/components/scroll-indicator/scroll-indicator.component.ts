import {
  Component,
  OnDestroy,
  AfterViewInit,
  NgZone,
  inject,
  PLATFORM_ID,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  OnInit,
  ElementRef,
  ViewChild,
} from '@angular/core';
import { isPlatformBrowser, NgClass } from '@angular/common';
import { Subscription } from 'rxjs';
import { TranslationService } from '../../services/translation/translation.service';

@Component({
  selector: 'app-scroll-indicator',
  standalone: true,
  imports: [NgClass],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="scroll-indicator" [class.visible]="progress > 1 || isDragging" aria-hidden="true">
      <div class="section-toast" [class.show]="isDragging" [style.top.%]="progress">
        <span class="toast-label">{{ toastLabel }}</span>
      </div>
      <div class="track" #track
           (mousedown)="onTrackMouseDown($event)"
           (touchstart)="onTrackTouchStart($event)">
        <div class="fill" [class.no-transition]="isDragging" [style.height.%]="progress"></div>
        <div class="thumb" [class.no-transition]="isDragging" [style.top.%]="progress"
             (mousedown)="onThumbMouseDown($event)"
             (touchstart)="onThumbTouchStart($event)">
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
      pointer-events: all;
    }

    .track {
      position: relative;
      width: 3px;
      height: 120px;
      border-radius: 10px;
      background: rgba(var(--primary-rgb), 0.08);
      overflow: visible;
      cursor: pointer;
      touch-action: none;
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
      cursor: grab;
      touch-action: none;
      padding: 8px;
    }

    .thumb:active {
      cursor: grabbing;
    }

    .thumb.no-transition,
    .fill.no-transition {
      transition: none !important;
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
      animation: thumb-pulse-light 2s ease-in-out infinite;
    }

    @keyframes thumb-pulse-light {
      0%, 100% { box-shadow: 0 0 8px rgba(13, 148, 136, 0.9), 0 0 16px rgba(13, 148, 136, 0.4); transform: scale(1); }
      50% { box-shadow: 0 0 12px rgba(13, 148, 136, 1), 0 0 24px rgba(13, 148, 136, 0.6); transform: scale(1.2); }
    }

    /* ---- Section Toast ---- */
    .section-toast {
      position: absolute;
      right: calc(100% + 12px);
      transform: translateY(-50%) translateX(8px);
      opacity: 0;
      pointer-events: none;
      transition: opacity 0.2s ease, transform 0.2s ease;
      white-space: nowrap;
    }

    .section-toast.show {
      opacity: 1;
      transform: translateY(-50%) translateX(0);
    }

    .toast-label {
      display: inline-block;
      font-size: 10px;
      font-weight: 700;
      letter-spacing: 0.08em;
      text-transform: uppercase;
      color: var(--green);
      background: rgba(10, 25, 47, 0.8);
      border: 1px solid rgba(100, 255, 218, 0.2);
      border-right: 2px solid var(--green);
      padding: 5px 10px;
      border-radius: 4px 0 0 4px;
      backdrop-filter: blur(8px);
      text-shadow: 0 0 10px rgba(100, 255, 218, 0.5);
      box-shadow: 0 2px 12px rgba(0, 0, 0, 0.3);
    }

    :host-context(.light) .toast-label {
      color: var(--important);
      background: rgba(255, 255, 255, 0.9);
      border-color: rgba(13, 148, 136, 0.25);
      border-right-color: var(--important);
      text-shadow: none;
      box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
    }

    @media (max-width: 1000px) {
      .scroll-indicator {
        right: 14px;
      }
      .track {
        height: 100px;
        width: 4px;
      }
      .thumb-dot {
        width: 14px;
        height: 14px;
      }
    }

    @media (max-width: 500px) {
      .scroll-indicator {
        right: 10px;
      }
      .track {
        height: 90px;
        width: 4px;
      }
      .thumb-dot {
        width: 14px;
        height: 14px;
      }
    }
  `],
})
export class ScrollIndicatorComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('track') trackRef!: ElementRef<HTMLElement>;

  progress = 0;
  progressInt = 0;
  toastLabel = '';
  isDragging = false;

  private platformId = inject(PLATFORM_ID);
  private cdr = inject(ChangeDetectorRef);
  private translationService = inject(TranslationService);
  private onScroll!: () => void;
  private onMouseMove!: (e: MouseEvent) => void;
  private onMouseUp!: () => void;
  private onTouchMove!: (e: TouchEvent) => void;
  private onTouchEnd!: () => void;
  private activeSection = '';
  private labelMap: Record<string, string> = {};
  private subs = new Subscription();

  constructor(private ngZone: NgZone) {}

  ngOnInit(): void {
    const streams: Record<string, any> = {
      about: this.translationService.getAboutSideBar(),
      experience: this.translationService.getExperience(),
      projects: this.translationService.getProjects(),
      technologies: this.translationService.getTech(),
    };
    for (const [id, obs] of Object.entries(streams)) {
      this.subs.add(obs.subscribe((label: string) => { this.labelMap[id] = label; }));
    }
  }

  ngAfterViewInit(): void {
    if (!isPlatformBrowser(this.platformId)) return;

    this.ngZone.runOutsideAngular(() => {
      this.onScroll = () => {
        if (this.isDragging) return;
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const p = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;

        const atBottom = (window.innerHeight + window.scrollY) >= document.documentElement.scrollHeight - 50;

        let active = 'about';
        if (atBottom) {
          active = 'technologies';
        } else {
          const above = (id: string) => {
            const el = document.getElementById(id);
            return el ? el.getBoundingClientRect().top <= 80 : false;
          };
          if (above('technologies')) active = 'technologies';
          else if (above('projects')) active = 'projects';
          else if (above('experience')) active = 'experience';
        }

        this.ngZone.run(() => {
          this.progress = Math.min(100, Math.max(0, p));
          this.progressInt = Math.round(this.progress);
          if (active !== this.activeSection) {
            this.activeSection = active;
            this.toastLabel = this.labelMap[active] ?? active;
          }
          this.cdr.markForCheck();
        });
      };

      window.addEventListener('scroll', this.onScroll, { passive: true });
    });
  }

  onThumbMouseDown(e: MouseEvent): void {
    e.preventDefault();
    e.stopPropagation();
    this.startDrag(e.clientY);
  }

  onTrackMouseDown(e: MouseEvent): void {
    e.preventDefault();
    const rect = this.trackRef.nativeElement.getBoundingClientRect();
    const pct = Math.min(1, Math.max(0, (e.clientY - rect.top) / rect.height));
    this.scrollToPercent(pct);
    this.startDrag(e.clientY);
  }

  onThumbTouchStart(e: TouchEvent): void {
    e.preventDefault();
    e.stopPropagation();
    this.startTouchDrag();
  }

  onTrackTouchStart(e: TouchEvent): void {
    e.preventDefault();
    const touch = e.touches[0];
    const rect = this.trackRef.nativeElement.getBoundingClientRect();
    const pct = Math.min(1, Math.max(0, (touch.clientY - rect.top) / rect.height));
    this.scrollToPercent(pct);
    this.startTouchDrag();
  }

  private startTouchDrag(): void {
    if (!isPlatformBrowser(this.platformId)) return;
    this.isDragging = true;

    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const offset = 80;
    const ids = ['experience', 'projects', 'technologies'] as const;
    const sectionOffsets = ids.map((id, i) => {
      const el = document.getElementById(id);
      let absTop = el ? el.getBoundingClientRect().top + window.scrollY : Infinity;
      if (i === ids.length - 1) absTop = Math.min(absTop, docHeight + offset - 1);
      return { id, top: absTop };
    });

    this.onTouchMove = (e: TouchEvent) => {
      e.preventDefault();
      const touch = e.touches[0];
      const rect = this.trackRef.nativeElement.getBoundingClientRect();
      const pct = Math.min(1, Math.max(0, (touch.clientY - rect.top) / rect.height));
      this.scrollToPercent(pct);

      const targetScrollY = pct * docHeight;
      let active = 'about';
      for (const { id, top } of sectionOffsets) {
        if (top - offset <= targetScrollY) active = id;
      }

      this.ngZone.run(() => {
        this.progress = pct * 100;
        this.progressInt = Math.round(this.progress);
        this.activeSection = active;
        this.toastLabel = this.labelMap[active] ?? active;
        this.cdr.markForCheck();
      });
    };

    this.onTouchEnd = () => {
      this.isDragging = false;
      document.removeEventListener('touchmove', this.onTouchMove);
      document.removeEventListener('touchend', this.onTouchEnd);
    };

    document.addEventListener('touchmove', this.onTouchMove, { passive: false });
    document.addEventListener('touchend', this.onTouchEnd);
  }

  private startDrag(_startY: number): void {
    if (!isPlatformBrowser(this.platformId)) return;
    this.isDragging = true;

    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const offset = 80;
    const ids = ['experience', 'projects', 'technologies'] as const;
    const sectionOffsets = ids.map((id, i) => {
      const el = document.getElementById(id);
      let absTop = el ? el.getBoundingClientRect().top + window.scrollY : Infinity;
      if (i === ids.length - 1) absTop = Math.min(absTop, docHeight + offset - 1);
      return { id, top: absTop };
    });

    this.onMouseMove = (e: MouseEvent) => {
      const rect = this.trackRef.nativeElement.getBoundingClientRect();
      const pct = Math.min(1, Math.max(0, (e.clientY - rect.top) / rect.height));
      this.scrollToPercent(pct);

      const targetScrollY = pct * docHeight;
      let active = 'about';
      for (const { id, top } of sectionOffsets) {
        if (top - offset <= targetScrollY) active = id;
      }

      this.ngZone.run(() => {
        this.progress = pct * 100;
        this.progressInt = Math.round(this.progress);
        this.activeSection = active;
        this.toastLabel = this.labelMap[active] ?? active;
        this.cdr.markForCheck();
      });
    };

    this.onMouseUp = () => {
      this.isDragging = false;
      document.removeEventListener('mousemove', this.onMouseMove);
      document.removeEventListener('mouseup', this.onMouseUp);
    };

    document.addEventListener('mousemove', this.onMouseMove);
    document.addEventListener('mouseup', this.onMouseUp);
  }

  private scrollToPercent(pct: number): void {
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    window.scrollTo({ top: pct * docHeight });
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
    if (isPlatformBrowser(this.platformId)) {
      if (this.onScroll) window.removeEventListener('scroll', this.onScroll);
      if (this.onMouseMove) document.removeEventListener('mousemove', this.onMouseMove);
      if (this.onMouseUp) document.removeEventListener('mouseup', this.onMouseUp);
      if (this.onTouchMove) document.removeEventListener('touchmove', this.onTouchMove);
      if (this.onTouchEnd) document.removeEventListener('touchend', this.onTouchEnd);
    }
  }
}
