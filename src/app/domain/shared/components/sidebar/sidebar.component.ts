import { Component, HostListener, OnInit } from '@angular/core';
import { NgClass, AsyncPipe } from '@angular/common';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { TranslationService } from '../../services/translation/translation.service';
import { NgIcon } from '@ng-icons/core';
import { GlitchTextDirective } from '../../directives/glitch-text.directive';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  standalone: true,
  imports: [NgIcon, NgClass, AsyncPipe, GlitchTextDirective],
})
export class SidebarComponent implements OnInit {
  activeSection: string = 'about';
  scrollToState: boolean = false;
  description$!: Observable<string>;
  about$!: Observable<string>;
  experience$!: Observable<string>;
  projects$!: Observable<string>;
  technologies$!: Observable<string>;

  navItems: { id: string; label$: Observable<string> }[] = [];

  constructor(
    private router: Router,
    private translationService: TranslationService
  ) {}

  ngOnInit(): void {
    this.description$ = this.translationService.getDescription();
    this.about$ = this.translationService.getAboutSideBar();
    this.experience$ = this.translationService.getExperience();
    this.projects$ = this.translationService.getProjects();
    this.technologies$ = this.translationService.getTech();

    this.navItems = [
      { id: 'about', label$: this.about$ },
      { id: 'experience', label$: this.experience$ },
      { id: 'projects', label$: this.projects$ },
      { id: 'technologies', label$: this.technologies$ },
    ];
  }

  scrollToSection(sectionId: string) {
    if (sectionId === 'about') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    const targetElement = document.getElementById(sectionId);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth' });
    }
  }

  scrollToInit() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }

  @HostListener('window:scroll')
  onScroll() {
    this.scrollToState = window.scrollY > 100;

    const atBottom = (window.innerHeight + window.scrollY) >= document.documentElement.scrollHeight - 50;

    if (atBottom) {
      if (this.activeSection !== 'technologies') {
        this.activeSection = 'technologies';
        this.router.navigate([], { fragment: 'technologies' });
      }
      return;
    }

    const offset = 80;
    const above = (id: string) => {
      const el = document.getElementById(id);
      return el ? el.getBoundingClientRect().top <= offset : false;
    };

    let active = 'about';
    if (above('technologies')) active = 'technologies';
    else if (above('projects')) active = 'projects';
    else if (above('experience')) active = 'experience';

    if (active !== this.activeSection) {
      this.activeSection = active;
      this.router.navigate([], { fragment: active });
    }
  }
}
