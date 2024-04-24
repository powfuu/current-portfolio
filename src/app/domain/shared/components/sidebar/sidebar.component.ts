import { Component, ElementRef, HostListener, OnInit } from '@angular/core';
import { ViewportScroller } from '@angular/common';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { TranslationService } from '../../services/translation/translation.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {
  activeSection: string = 'about';
  scrollToState: boolean = false;
  description$!: Observable<string>;
  about$!: Observable<string>;
  experience$!: Observable<string>;
  projects$!: Observable<string>;

  constructor(
    private viewportScroller: ViewportScroller,
    private elRef: ElementRef,
    private router: Router,
    private translationService: TranslationService
  ) {}

  ngOnInit(): void {
    this.description$ = this.translationService.getDescription();
    this.about$ = this.translationService.getAboutSideBar();
    this.experience$ = this.translationService.getExperience();
    this.projects$ = this.translationService.getProjects();
  }

  scrollToSection(sectionId: string) {
    const targetElement = this.elRef.nativeElement.querySelector(
      '#' + sectionId
    );
    if (targetElement) {
      this.viewportScroller.scrollToAnchor(sectionId);
    }
  }

  scrollToInit() {
    window.scrollTo(0, 0);
  }

  @HostListener('window:scroll', ['$event'])
  onScroll(event: UIEvent) {
    const aboutSection = document.getElementById('about');
    const experienceSection = document.getElementById('experience');
    const projectsSection = document.getElementById('projects');

    const scrollPosition = window.scrollY;
    const offset = 2; // Ajuste adicional de 2px

    this.scrollToState = scrollPosition > 100;

    if (aboutSection && experienceSection && projectsSection) {
      if (
        scrollPosition >= aboutSection.offsetTop - offset &&
        scrollPosition < experienceSection.offsetTop - offset
      ) {
        this.activeSection = 'about';
        this.router.navigate([], { fragment: 'about' });
      } else if (
        scrollPosition >= experienceSection.offsetTop - offset &&
        scrollPosition < projectsSection.offsetTop - offset
      ) {
        this.activeSection = 'experience';
        this.router.navigate([], { fragment: 'experience' });
      } else if (scrollPosition >= projectsSection.offsetTop - offset) {
        this.activeSection = 'projects';
        this.router.navigate([], { fragment: 'projects' });
      } else {
        this.activeSection = 'about';
        this.router.navigate([], { fragment: 'about' });
      }
    }
  }
}
