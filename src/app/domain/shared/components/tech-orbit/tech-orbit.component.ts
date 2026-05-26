import {
  Component,
  OnInit,
  OnDestroy,
  AfterViewInit,
  Input,
  NgZone,
  inject,
  PLATFORM_ID,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { NgIcon } from '@ng-icons/core';
import { Technologies } from '../../models/technologies.model';

interface OrbitPoint {
  tech: Technologies;
  ox: number; // original sphere coords
  oy: number;
  oz: number;
  // projected (screen) coords
  sx: number;
  sy: number;
  sz: number;
  scale: number;
  opacity: number;
  active: boolean;
}

@Component({
  selector: 'app-tech-orbit',
  standalone: true,
  imports: [NgIcon],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="orbit-scene"
      (mouseleave)="onSceneLeave()"
      (mousemove)="onSceneMouseMove($event)">

      <div class="orbit-rings-bg">
        <div class="ring ring-1"></div>
        <div class="ring ring-2"></div>
        <div class="ring ring-3"></div>
      </div>

      @for (item of items; track item.tech.tech) {
        <div class="orbit-item"
          [class.active]="item.active"
          [style.opacity]="item.opacity"
          [style.transform]="'translate(calc(-50% + ' + item.sx + 'px), calc(-50% + ' + item.sy + 'px)) scale(' + item.scale + ')'"
          [style.z-index]="item.active ? 999 : getZIndex(item.sz)"
          (mouseenter)="onItemHover(item)"
          (mouseleave)="onItemLeave(item)">
          <div class="orbit-item-inner">
            @if (getSkillIcon(item.tech.tech)) {
              <ng-icon [name]="getSkillIcon(item.tech.tech)" [color]="getSkillColor(item.tech.tech)" class="tech-icon"></ng-icon>
            } @else {
              <img loading="lazy" [alt]="item.tech.tech" [src]="item.tech.src" />
            }
            <span class="tech-label">{{item.tech.tech}}</span>
          </div>
        </div>
      }

      <div class="center-glow"></div>
    </div>
  `,
  styles: [`
    .orbit-scene {
      position: relative;
      width: 100%;
      height: 520px;
      display: flex;
      align-items: center;
      justify-content: center;
      overflow: visible;
    }

    .orbit-rings-bg {
      position: absolute;
      width: 100%;
      height: 100%;
      pointer-events: none;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .ring {
      position: absolute;
      border-radius: 50%;
      border: 1px solid rgba(var(--primary-rgb), 0.1);
      animation: ring-glow 5s ease-in-out infinite;
    }

    .ring-1 {
      width: 360px;
      height: 130px;
      transform: rotateX(75deg);
      animation-delay: 0s;
    }

    .ring-2 {
      width: 480px;
      height: 174px;
      transform: rotateX(75deg);
      animation-delay: 1.7s;
    }

    .ring-3 {
      width: 260px;
      height: 94px;
      transform: rotateX(75deg) rotateZ(55deg);
      animation-delay: 3.1s;
    }

    @keyframes ring-glow {
      0%, 100% { border-color: rgba(var(--primary-rgb), 0.07); }
      50% { border-color: rgba(var(--primary-rgb), 0.2); }
    }

    .center-glow {
      position: absolute;
      width: 100px;
      height: 100px;
      border-radius: 50%;
      background: radial-gradient(circle, rgba(var(--primary-rgb), 0.06) 0%, transparent 70%);
      pointer-events: none;
      animation: center-pulse 4s ease-in-out infinite;
    }

    @keyframes center-pulse {
      0%, 100% { transform: scale(1); opacity: 0.4; }
      50% { transform: scale(1.5); opacity: 0.9; }
    }

    .orbit-item {
      position: absolute;
      top: 50%;
      left: 50%;
      cursor: pointer;
      transition: opacity 0.35s ease;
      will-change: transform, opacity;
    }

    .orbit-item-inner {
      transform: translate(-50%, -50%);
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 6px;
      padding: 10px 14px;
      border-radius: 12px;
      border: 1px solid rgba(var(--primary-rgb), 0.15);
      background: rgba(10, 25, 47, 0.72);
      backdrop-filter: blur(8px);
      -webkit-backdrop-filter: blur(8px);
      transition: border-color 0.3s ease,
                  background 0.3s ease,
                  box-shadow 0.3s ease,
                  transform 0.3s cubic-bezier(0.16, 1, 0.3, 1);
      min-width: 76px;
      white-space: nowrap;
    }

    .orbit-item:hover .orbit-item-inner,
    .orbit-item.active .orbit-item-inner {
      border-color: rgba(var(--primary-rgb), 0.65);
      background: rgba(var(--primary-rgb), 0.08);
      box-shadow: 0 0 20px rgba(var(--primary-rgb), 0.18),
                  0 0 40px rgba(var(--primary-rgb), 0.06);
      transform: translate(-50%, -50%) scale(1.14);
    }

    .orbit-item:hover .tech-label,
    .orbit-item.active .tech-label {
      color: var(--green);
    }

    .tech-icon {
      font-size: 32px;
    }

    img {
      height: 34px;
      max-width: 70px;
      object-fit: contain;
      filter: brightness(0.9);
    }

    .tech-label {
      color: var(--light-slate);
      font-size: 11px;
      font-weight: 600;
      text-align: center;
      transition: color 0.3s ease;
    }

    :host-context(.light) .orbit-item-inner {
      background: rgba(248, 250, 252, 0.82);
      border-color: rgba(13, 148, 136, 0.2);
    }

    :host-context(.light) .orbit-item:hover .orbit-item-inner,
    :host-context(.light) .orbit-item.active .orbit-item-inner {
      border-color: rgba(13, 148, 136, 0.7);
      background: rgba(13, 148, 136, 0.08);
      box-shadow: 0 0 20px rgba(13, 148, 136, 0.2);
    }

    :host-context(.light) .ring {
      border-color: rgba(13, 148, 136, 0.12);
    }

    :host-context(.light) .center-glow {
      background: radial-gradient(circle, rgba(13, 148, 136, 0.08) 0%, transparent 70%);
    }

    @media (max-width: 860px) {
      .orbit-scene { height: 440px; }
    }

    @media (max-width: 500px) {
      .orbit-scene { height: 360px; }
      .orbit-item-inner { padding: 7px 10px; min-width: 58px; }
      .tech-icon { font-size: 26px; }
      img { height: 26px; }
    }
  `],
})
export class TechOrbitComponent implements OnInit, AfterViewInit, OnDestroy {
  @Input() technologies: Technologies[] = [];
  @Input() getSkillIconFn!: (tech: string) => string;
  @Input() getSkillColorFn!: (tech: string) => string;

  items: OrbitPoint[] = [];

  private platformId = inject(PLATFORM_ID);
  private cdr = inject(ChangeDetectorRef);

  private rotY = 0;
  private rotX = 14;
  private velY = 0.35;
  private animId = 0;
  private isHovering = false;
  private readonly R = 200;

  constructor(private ngZone: NgZone) {}

  ngOnInit(): void {
    this.buildSphere();
  }

  ngAfterViewInit(): void {
    if (!isPlatformBrowser(this.platformId)) return;
    this.ngZone.runOutsideAngular(() => this.loop());
  }

  ngOnDestroy(): void {
    cancelAnimationFrame(this.animId);
  }

  private buildSphere(): void {
    const n = this.technologies.length;
    const phi = Math.PI * (3 - Math.sqrt(5));

    this.items = this.technologies.map((tech, i) => {
      const y = 1 - (i / (n - 1)) * 2;
      const r = Math.sqrt(1 - y * y);
      const theta = phi * i;
      return {
        tech,
        ox: Math.cos(theta) * r * this.R,
        oy: y * this.R,
        oz: Math.sin(theta) * r * this.R,
        sx: 0, sy: 0, sz: 0,
        scale: 1, opacity: 1, active: false,
      };
    });
  }

  private project(ox: number, oy: number, oz: number): { sx: number; sy: number; sz: number } {
    const ry = this.rotY * Math.PI / 180;
    const rx = this.rotX * Math.PI / 180;

    const cosY = Math.cos(ry), sinY = Math.sin(ry);
    const x1 = ox * cosY + oz * sinY;
    const z1 = -ox * sinY + oz * cosY;

    const cosX = Math.cos(rx), sinX = Math.sin(rx);
    const y2 = oy * cosX - z1 * sinX;
    const z2 = oy * sinX + z1 * cosX;

    return { sx: x1, sy: y2, sz: z2 };
  }

  private loop(): void {
    if (!this.isHovering) {
      this.velY = this.velY * 0.96 + 0.35 * 0.04;
    }
    this.rotY += this.velY;

    const updatedItems = this.items.map(item => {
      const { sx, sy, sz } = this.project(item.ox, item.oy, item.oz);
      const t = (sz + this.R) / (2 * this.R);
      return {
        ...item,
        sx, sy, sz,
        scale: item.active ? 1.1 : 0.72 + t * 0.32,
        opacity: item.active ? 1 : 0.22 + t * 0.78,
      };
    });

    this.ngZone.run(() => {
      this.items = updatedItems;
      this.cdr.markForCheck();
    });

    this.animId = requestAnimationFrame(() => this.loop());
  }

  getZIndex(sz: number): number {
    return Math.round(((sz + this.R) / (2 * this.R)) * 98) + 1;
  }

  getSkillIcon(tech: string): string {
    return this.getSkillIconFn ? this.getSkillIconFn(tech) : '';
  }

  getSkillColor(tech: string): string {
    return this.getSkillColorFn ? this.getSkillColorFn(tech) : '';
  }

  onItemHover(item: OrbitPoint): void {
    this.items = this.items.map(i => ({ ...i, active: i === item }));
    this.isHovering = true;
  }

  onItemLeave(_item: OrbitPoint): void {
    this.items = this.items.map(i => ({ ...i, active: false }));
  }

  onSceneLeave(): void {
    this.isHovering = false;
    this.items = this.items.map(i => ({ ...i, active: false }));
  }

  onSceneMouseMove(e: MouseEvent): void {
    this.isHovering = true;
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    const dx = (e.clientX - rect.left - rect.width / 2) / (rect.width / 2);
    this.velY = dx * 2.0;
  }
}
