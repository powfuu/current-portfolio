import { Component, NgZone, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { inject } from '@vercel/analytics';
import { injectSpeedInsights } from '@vercel/speed-insights';
import { TranslationService } from './domain/shared/services/translation/translation.service';
import { RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { LanguageSelectorComponent } from './domain/shared/components/language-selector/language-selector.component';
import { ParticlesBackgroundComponent } from './domain/shared/components/particles-background/particles-background.component';
import { CustomCursorComponent } from './domain/shared/components/custom-cursor/custom-cursor.component';
import { ScrollIndicatorComponent } from './domain/shared/components/scroll-indicator/scroll-indicator.component';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    standalone: true,
    imports: [
    FormsModule,
    RouterOutlet,
    LanguageSelectorComponent,
    ParticlesBackgroundComponent,
    CustomCursorComponent,
    ScrollIndicatorComponent,
],
})
export class AppComponent implements OnInit, AfterViewInit {
  langState: string = 'es';
  theme: string = 'dark';
  loadingScreen: boolean = true;
  scrollProgress: number = 0;

  @ViewChild('particles') particlesComponent!: ParticlesBackgroundComponent;

  private bgEl!: HTMLElement;

  constructor(
    private ngZone: NgZone,
    private translationService: TranslationService
  ) {}

  ngOnInit() {
    this.initVercelAnalyticsAndSpeedInsights();
    this.initTheme();
    this.initLang();
    this.applyTheme(this.theme);
    this.manageTimers();
    this.refreshTranslations();
  }

  ngAfterViewInit(): void {
    this.bgEl = document.querySelector('.bgEffect') as HTMLElement;
    this.ngZone.runOutsideAngular(() => {
      document.addEventListener('mousemove', (e: MouseEvent) => {
        if (this.bgEl) {
          this.bgEl.style.top = `${e.clientY - 350}px`;
          this.bgEl.style.left = `${e.clientX - 350}px`;
        }
        if (this.particlesComponent) {
          this.particlesComponent.onMouseMove(e.clientX, e.clientY);
        }
      });
      document.addEventListener('mouseleave', () => {
        if (this.particlesComponent) this.particlesComponent.onMouseLeave();
      });
    });

    // scroll progress bar
    this.ngZone.runOutsideAngular(() => {
      window.addEventListener('scroll', () => {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
        this.ngZone.run(() => { this.scrollProgress = progress; });
      }, { passive: true });
    });
  }

  refreshTranslations(): void {
    this.translationService.refreshTranslations();
  }

  initVercelAnalyticsAndSpeedInsights(): void {
    inject();
    injectSpeedInsights();
  }

  changeStateLanguage(e: Event): void {
    const lang = (e.target as HTMLSelectElement).value;
    localStorage.setItem('lang', lang);
    this.refreshTranslations();
  }

  initTheme(): void {
    this.theme = localStorage.getItem('theme') || 'dark';
  }

  initLang(): void {
    this.langState = localStorage.getItem('lang') || 'es';
    if (!localStorage.getItem('lang')) {
      localStorage.setItem('lang', 'es');
    }
  }

  manageTimers(): void {
    setTimeout(() => {
      document.querySelector('.logo')?.classList.add('finished');
    }, 1570);
    setTimeout(() => {
      this.loadingScreen = false;
    }, 1800);
  }

  toggleTheme(event: MouseEvent): void {
    const newTheme = this.theme === 'light' ? 'dark' : 'light';

    if (!(document as any).startViewTransition) {
      this.theme = newTheme;
      this.applyTheme(newTheme);
      localStorage.setItem('theme', newTheme);
      return;
    }

    const x = event.clientX;
    const y = event.clientY;
    const endRadius = Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y)
    );

    const transition = (document as any).startViewTransition(() => {
      this.theme = newTheme;
      this.applyTheme(newTheme);
      localStorage.setItem('theme', newTheme);
    });

    transition.ready.then(() => {
      document.documentElement.animate(
        {
          clipPath: [
            `circle(0px at ${x}px ${y}px)`,
            `circle(${endRadius}px at ${x}px ${y}px)`,
          ],
        },
        {
          duration: 600,
          easing: 'cubic-bezier(0.16, 1, 0.3, 1)',
          pseudoElement: '::view-transition-new(root)',
        }
      );
    });
  }

  private applyTheme(theme: string): void {
    document.body.className = theme;
  }
}
