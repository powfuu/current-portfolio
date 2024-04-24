import { Component, HostListener, NgZone, OnInit } from '@angular/core';
import { inject } from '@vercel/analytics';
import { injectSpeedInsights } from '@vercel/speed-insights';
import { TranslationService } from './domain/shared/services/translation/translation.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  langState: string = 'es';
  theme: string = 'dark';
  loadingScreen: boolean = true;
  mouseX: number = 0;
  mouseY: number = 0;

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

  refreshTranslations(): void {
    this.translationService.refreshTranslations();
  }

  initVercelAnalyticsAndSpeedInsights(): void {
    //Init Analytics
    inject();
    //Init Speed Insights
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
    //add finished class
    setTimeout(() => {
      document.querySelector('.logo')?.classList.add('finished');
    }, 1570);
    //stop loading screen after 1800ms
    setTimeout(() => {
      this.loadingScreen = false;
    }, 1800);
  }

  toggleTheme(): void {
    this.theme = this.theme === 'light' ? 'dark' : 'light';
    this.applyTheme(this.theme);
    localStorage.setItem('theme', this.theme);
  }

  private applyTheme(theme: string): void {
    document.body.className = theme;
  }

  @HostListener('document:mousemove', ['$event'])
  onMouseMove(event: MouseEvent): void {
    this.mouseX = event.clientX;
    this.mouseY = event.clientY;
  }

  ngAfterViewInit(): void {
    this.ngZone.runOutsideAngular(() => this.updatePosition());
  }

  updatePosition(): void {
    requestAnimationFrame(() => {
      this.ngZone.run(() => {
        this.updatePosition();
      });
    });
  }
}
