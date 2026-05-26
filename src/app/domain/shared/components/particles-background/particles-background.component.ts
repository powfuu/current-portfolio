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
  glowIntensity: number;
  glowTarget: number;
  glowSpeed: number;
  glowTimer: number;
  bold: boolean;
  fontStr: string; // cached font string
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
  private readonly COUNT = 55;
  private readonly MAX_GLOWING = 3;
  private glowingCount = 0; // tracked manually — no filter() per frame

  private platformId = inject(PLATFORM_ID);
  constructor(private ngZone: NgZone) {}

  ngAfterViewInit(): void {
    if (!isPlatformBrowser(this.platformId)) return;
    this.isDark = !document.body.classList.contains('light');
    this.initCanvas();
    this.spawn();
    this.ngZone.runOutsideAngular(() => this.animate());

    new MutationObserver(() => {
      const wasDark = this.isDark;
      this.isDark = !document.body.classList.contains('light');
      if (wasDark !== this.isDark) {
        // recalc baseOpacity for all existing glyphs so theme change is instant
        for (const g of this.glyphs) {
          g.baseOpacity = this.isDark
            ? 0.025 + Math.random() * 0.055
            : 0.28 + Math.random() * 0.22;
        }
      }
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
      : 0.28 + Math.random() * 0.22;
    const colorRoll = Math.random();
    const color: Glyph['color'] = colorRoll < 0.55 ? 'green' : colorRoll < 0.82 ? 'cyan' : 'blue';

    // when recycling, enter from a random edge (not just bottom)
    let x: number, y: number, vx: number, vy: number;
    if (startAny) {
      x = Math.random() * W;
      y = Math.random() * H;
      vx = (Math.random() - 0.5) * 0.07;
      vy = -(0.1 + Math.random() * 0.3);
    } else {
      const edge = Math.floor(Math.random() * 4); // 0=bottom, 1=left, 2=right, 3=top
      if (edge === 0) {        // from bottom
        x = Math.random() * W; y = H + 50 + Math.random() * 100;
        vx = (Math.random() - 0.5) * 0.07; vy = -(0.1 + Math.random() * 0.3);
      } else if (edge === 1) { // from left
        x = -60 - Math.random() * 80; y = Math.random() * H;
        vx = 0.08 + Math.random() * 0.15; vy = (Math.random() - 0.5) * 0.07;
      } else if (edge === 2) { // from right
        x = W + 60 + Math.random() * 80; y = Math.random() * H;
        vx = -(0.08 + Math.random() * 0.15); vy = (Math.random() - 0.5) * 0.07;
      } else {                 // from top
        x = Math.random() * W; y = -60 - Math.random() * 80;
        vx = (Math.random() - 0.5) * 0.07; vy = 0.08 + Math.random() * 0.2;
      }
    }

    const bold = Math.random() < 0.18;
    const fontStr = `${bold ? '600 ' : ''}${size}px 'JetBrains Mono','Fira Code','Courier New',monospace`;
    return {
      x, y, vx, vy,
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
      glowSpeed: 0.006 + Math.random() * 0.012,
      glowTimer: Math.floor(150 + Math.random() * 500),
      bold,
      fontStr,
    };
  }

  private spawn(): void {
    const W = this.canvasRef.nativeElement.width;
    const H = this.canvasRef.nativeElement.height;
    // grid covers full viewport + small edge margin so borders are populated
    const cols = Math.ceil(Math.sqrt(this.COUNT * (W / H)));
    const rows = Math.ceil(this.COUNT / cols);
    const marginX = W * 0.04;
    const marginY = H * 0.04;
    const cellW = (W + marginX * 2) / cols;
    const cellH = (H + marginY * 2) / rows;
    this.glyphs = [];
    this.glowingCount = 0;
    for (let r = 0; r < rows && this.glyphs.length < this.COUNT; r++) {
      for (let c = 0; c < cols && this.glyphs.length < this.COUNT; c++) {
        const g = this.randomGlyph(W, H, true);
        g.x = -marginX + c * cellW + cellW * 0.1 + Math.random() * cellW * 0.8;
        g.y = -marginY + r * cellH + cellH * 0.1 + Math.random() * cellH * 0.8;
        // assign directional drift based on position (edges drift inward, center drifts up)
        const cx = g.x / W - 0.5;
        const cy = g.y / H - 0.5;
        const nearEdge = Math.abs(cx) > 0.38 || Math.abs(cy) > 0.38;
        if (nearEdge) {
          g.vx = -cx * (0.05 + Math.random() * 0.1);
          g.vy = -cy * (0.05 + Math.random() * 0.1);
        }
        this.glyphs.push(g);
      }
    }
  }

  private animate(): void {
    const canvas = this.canvasRef.nativeElement;
    const W = canvas.width;
    const H = canvas.height;
    this.t++;

    const ctx = this.ctx;
    ctx.clearRect(0, 0, W, H);
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    const greenC = this.isDark ? '100,255,219' : '6,68,64';
    const cyanC  = this.isDark ? '6,182,212'   : '7,95,114';
    const blueC  = this.isDark ? '87,203,255'  : '26,54,100';
    const glowMul = this.isDark ? 0.45 : 0.3;
    const mouseX = this.mouseX;
    const mouseY = this.mouseY;
    const REPULSE_SQ = 130 * 130;
    const pad = 120;
    const t = this.t;

    // reset shadow once before loop — only glowing glyphs re-set it
    ctx.shadowBlur = 0;

    for (let i = this.glyphs.length - 1; i >= 0; i--) {
      const g = this.glyphs[i];

      // mouse repulsion — squared distance, no sqrt unless inside radius
      const dx = g.x - mouseX;
      const dy = g.y - mouseY;
      const distSq = dx * dx + dy * dy;
      if (distSq < REPULSE_SQ && distSq > 0) {
        const dist = Math.sqrt(distSq);
        const f = (130 - dist) / 130 * 0.28;
        g.vx += (dx / dist) * f;
        g.vy += (dy / dist) * f;
      }

      g.vx *= 0.992;
      g.vy *= 0.992;
      g.x += g.vx + Math.sin(t * 0.007 + g.pulsePhase) * 0.1;
      g.y += g.vy;
      g.rotation += g.rotationSpeed;

      // glow system — glowingCount tracked manually, no filter() per frame
      g.glowTimer--;
      if (g.glowTimer <= 0) {
        if (g.glowTarget === 1) {
          g.glowTarget = 0;
          this.glowingCount--;
          g.glowTimer = Math.floor(500 + Math.random() * 1000);
        } else {
          if (this.glowingCount < this.MAX_GLOWING) {
            g.glowTarget = 1;
            this.glowingCount++;
            g.glowTimer = Math.floor(100 + Math.random() * 250);
          } else {
            g.glowTimer = Math.floor(120 + Math.random() * 200);
          }
        }
      }
      g.glowIntensity += (g.glowTarget - g.glowIntensity) * g.glowSpeed;

      // recycle off-screen
      if (g.y < -pad || g.y > H + pad || g.x < -pad || g.x > W + pad) {
        if (g.glowTarget === 1) this.glowingCount--;
        this.glyphs[i] = this.randomGlyph(W, H);
        continue;
      }

      const basePulse = 0.75 + Math.sin(t * g.pulseSpeed + g.pulsePhase) * 0.25;
      const rgb = g.color === 'cyan' ? cyanC : g.color === 'blue' ? blueC : greenC;
      const renderOpacity = Math.min(g.baseOpacity * basePulse + g.glowIntensity * glowMul, 0.9);

      // transform without save/restore — manually reset after
      ctx.translate(g.x, g.y);
      ctx.rotate(g.rotation);

      if (g.glowIntensity > 0.05) {
        ctx.shadowColor = `rgba(${rgb},${g.glowIntensity * 0.7})`;
        ctx.shadowBlur = g.glowIntensity * 14;
      }

      ctx.font = g.fontStr;
      ctx.fillStyle = `rgba(${rgb},${renderOpacity})`;
      ctx.fillText(g.text, 0, 0);

      // reset transform and shadow without save/restore stack
      ctx.rotate(-g.rotation);
      ctx.translate(-g.x, -g.y);
      if (g.glowIntensity > 0.05) ctx.shadowBlur = 0;
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
