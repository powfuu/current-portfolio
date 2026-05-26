import {
  Component,
  OnDestroy,
  ElementRef,
  ViewChild,
  AfterViewInit,
  NgZone,
  HostListener,
  inject,
  PLATFORM_ID,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

interface Glyph {
  x: number;
  y: number;
  vy: number;
  vx: number;
  text: string;
  fontSize: number;
  baseOpacity: number;
  pulsePhase: number;
  pulseSpeed: number;
  color: 'green' | 'cyan' | 'blue';
  rotation: number;
  rotationSpeed: number;
  // smooth glow system
  glowIntensity: number;   // 0..1 current
  glowTarget: number;      // 0 or 1
  glowSpeed: number;       // lerp speed per frame
  glowTimer: number;       // frames until next glow event
  bold: boolean;
}

const CODE_GLYPHS = [
  // operators & punctuation
  '{}', '()', '[]', '=>', '//', '&&', '||', '++', '--', '!=',
  '===', '...', '??', '::', '!', '~', '%', '#', '@', '$',
  '+=', '-=', '*=', '/=', '**', '?.',
  // keywords
  'const', 'let', 'var', 'fn()', 'async', 'await', 'import',
  'export', 'return', 'if()', 'for()', 'while', 'class',
  'new', 'this', 'null', 'true', 'false', 'typeof',
  // types & generics
  '<T>', '</>',  'void', 'any', 'never', 'string', 'number',
  // html/template
  '<div>', '</div>', '<ng-', '[(', ')]', '{{}}',
  // binary/hex flavor
  '0x0', '0x1', '0xFF', '0b1', '0b0', '0x2A',
  // comments & docs
  '/**', '*/', '<!--', '-->', '// ...', '# !',
  // angular/ts specific
  '@Input', '@Output', 'pipe()', 'map()', 'tap()',
  'sub()', 'emit()', 'next()', '.ts', '.html', '.scss',
];

@Component({
  selector: 'app-particles-background',
  template: `<canvas #canvas class="glyph-canvas"></canvas>`,
  styles: [`
    .glyph-canvas {
      position: fixed;
      top: 0; left: 0;
      width: 100%; height: 100%;
      z-index: -1;
      pointer-events: none;
    }
  `],
  standalone: true,
})
export class ParticlesBackgroundComponent implements AfterViewInit, OnDestroy {
  @ViewChild('canvas') canvasRef!: ElementRef<HTMLCanvasElement>;

  private ctx!: CanvasRenderingContext2D;
  private glyphs: Glyph[] = [];
  private animFrameId = 0;
  private mouseX = -9999;
  private mouseY = -9999;
  private isDark = true;
  private t = 0;
  private readonly COUNT = 68;
  private readonly MAX_GLOWING = 2;  // max simultaneous glow events

  private platformId = inject(PLATFORM_ID);
  constructor(private ngZone: NgZone) {}

  ngAfterViewInit(): void {
    if (!isPlatformBrowser(this.platformId)) return;
    this.isDark = !document.body.classList.contains('light');
    this.initCanvas();
    this.spawn();
    this.ngZone.runOutsideAngular(() => this.animate());

    new MutationObserver(() => {
      this.isDark = !document.body.classList.contains('light');
    }).observe(document.body, { attributes: true, attributeFilter: ['class'] });
  }

  ngOnDestroy(): void {
    cancelAnimationFrame(this.animFrameId);
  }

  @HostListener('window:resize')
  onResize(): void {
    if (!isPlatformBrowser(this.platformId)) return;
    this.initCanvas();
    this.spawn();
  }

  private initCanvas(): void {
    const c = this.canvasRef.nativeElement;
    c.width = window.innerWidth;
    c.height = window.innerHeight;
    this.ctx = c.getContext('2d')!;
  }

  private randomGlyph(W: number, H: number, startAny = false): Glyph {
    const size = 9 + Math.random() * 14;
    const base = this.isDark
      ? 0.025 + Math.random() * 0.055
      : 0.28 + Math.random() * 0.22; // light mode: high opacity, dark colors for contrast on white
    const colorRoll = Math.random();
    const color: Glyph['color'] = colorRoll < 0.55 ? 'green' : colorRoll < 0.82 ? 'cyan' : 'blue';
    return {
      x: Math.random() * W,
      y: startAny ? Math.random() * H : H + 50 + Math.random() * 200,
      vy: -(0.1 + Math.random() * 0.3),
      vx: (Math.random() - 0.5) * 0.07,
      text: CODE_GLYPHS[Math.floor(Math.random() * CODE_GLYPHS.length)],
      fontSize: size,
      baseOpacity: base,
      pulsePhase: Math.random() * Math.PI * 2,
      pulseSpeed: 0.003 + Math.random() * 0.007,
      color,
      rotation: (Math.random() - 0.5) * 0.25,
      rotationSpeed: (Math.random() - 0.5) * 0.0006,
      glowIntensity: 0,
      glowTarget: 0,
      glowSpeed: 0.006 + Math.random() * 0.012,  // slow lerp — smooth rise/fall
      glowTimer: Math.floor(150 + Math.random() * 500),
      bold: Math.random() < 0.18,
    };
  }

  private spawn(): void {
    const W = this.canvasRef.nativeElement.width;
    const H = this.canvasRef.nativeElement.height;
    // Poisson-lite: divide canvas into grid cells, place one glyph per cell with jitter
    // This prevents clustering and ensures even visual coverage
    const cols = Math.ceil(Math.sqrt(this.COUNT * (W / H)));
    const rows = Math.ceil(this.COUNT / cols);
    const cellW = W / cols;
    const cellH = H / rows;
    this.glyphs = [];
    for (let r = 0; r < rows && this.glyphs.length < this.COUNT; r++) {
      for (let c = 0; c < cols && this.glyphs.length < this.COUNT; c++) {
        const g = this.randomGlyph(W, H, true);
        // place within cell with jitter (70% of cell size)
        g.x = c * cellW + cellW * 0.15 + Math.random() * cellW * 0.7;
        g.y = r * cellH + cellH * 0.15 + Math.random() * cellH * 0.7;
        this.glyphs.push(g);
      }
    }
  }

  private animate(): void {
    const canvas = this.canvasRef.nativeElement;
    const W = canvas.width;
    const H = canvas.height;
    this.t++;

    this.ctx.clearRect(0, 0, W, H);
    this.ctx.textAlign = 'center';
    this.ctx.textBaseline = 'middle';

    const greenC = this.isDark ? '100,255,219' : '6,68,64';
    const cyanC  = this.isDark ? '6,182,212'   : '7,95,114';
    const blueC  = this.isDark ? '87,203,255'  : '26,54,100';

    for (let i = this.glyphs.length - 1; i >= 0; i--) {
      const g = this.glyphs[i];

      // mouse repulsion
      const dx = g.x - this.mouseX;
      const dy = g.y - this.mouseY;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 130 && dist > 0) {
        const f = (130 - dist) / 130 * 0.28;
        g.vx += (dx / dist) * f;
        g.vy += (dy / dist) * f;
      }

      g.vx *= 0.978;
      // keep upward drift: lerp vy toward base speed
      const baseVy = -(0.1 + 0.15);
      g.vy += (baseVy - g.vy) * 0.003;

      g.x += g.vx + Math.sin(this.t * 0.007 + g.pulsePhase) * 0.1;
      g.y += g.vy;
      g.rotation += g.rotationSpeed;

      // ---- smooth glow system (global cap) ----
      g.glowTimer--;
      if (g.glowTimer <= 0) {
        if (g.glowTarget === 1) {
          // currently lit — fade out
          g.glowTarget = 0;
          g.glowTimer = Math.floor(500 + Math.random() * 1000); // long dim pause
        } else {
          // want to light up — only if under cap
          const currentlyGlowing = this.glyphs.filter(x => x.glowTarget === 1).length;
          if (currentlyGlowing < this.MAX_GLOWING) {
            g.glowTarget = 1;
            g.glowTimer = Math.floor(100 + Math.random() * 250); // stay lit 100-350 frames
          } else {
            // defer — try again later
            g.glowTimer = Math.floor(120 + Math.random() * 200);
          }
        }
      }
      // smooth lerp — gentle fade in/out, no jump
      g.glowIntensity += (g.glowTarget - g.glowIntensity) * g.glowSpeed;

      // recycle off-screen
      if (g.y < -60) {
        this.glyphs[i] = this.randomGlyph(W, H);
        continue;
      }
      if (g.x < -80) g.x = W + 80;
      if (g.x > W + 80) g.x = -80;

      // base subtle pulse
      const basePulse = 0.75 + Math.sin(this.t * g.pulseSpeed + g.pulsePhase) * 0.25;
      const rgb = g.color === 'cyan' ? cyanC : g.color === 'blue' ? blueC : greenC;

      // opacity: base * pulse, boosted by glow — glow events are clearly distinct
      const glowBoost = g.glowIntensity * (this.isDark ? 0.45 : 0.3);
      const renderOpacity = g.baseOpacity * basePulse + glowBoost;

      this.ctx.save();
      this.ctx.translate(g.x, g.y);
      this.ctx.rotate(g.rotation);

      // glow shadow when lit — proportional to intensity, soft
      if (g.glowIntensity > 0.05) {
        const blur = g.glowIntensity * 14;
        this.ctx.shadowColor = `rgba(${rgb},${g.glowIntensity * 0.7})`;
        this.ctx.shadowBlur = blur;
      }

      const weight = g.bold ? '600 ' : '';
      this.ctx.font = `${weight}${g.fontSize}px 'JetBrains Mono','Fira Code','Courier New',monospace`;
      this.ctx.fillStyle = `rgba(${rgb},${Math.min(renderOpacity, 0.9).toFixed(3)})`;
      this.ctx.fillText(g.text, 0, 0);
      this.ctx.restore();
    }

    this.animFrameId = requestAnimationFrame(() => this.animate());
  }

  onMouseMove(x: number, y: number): void {
    this.mouseX = x;
    this.mouseY = y;
  }

  onMouseLeave(): void {
    this.mouseX = -9999;
    this.mouseY = -9999;
  }
}
