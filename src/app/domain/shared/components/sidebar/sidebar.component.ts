import { Component, ElementRef, HostListener } from '@angular/core';
import { ViewportScroller } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent {
  activeSection: string = 'about';

  constructor(
    private viewportScroller: ViewportScroller,
    private elRef: ElementRef,
    private router: Router
  ) {}

  scrollToSection(sectionId: string) {
    const targetElement = this.elRef.nativeElement.querySelector(
      '#' + sectionId
    );
    if (targetElement) {
      this.viewportScroller.scrollToAnchor(sectionId);
    }
  }

  @HostListener('window:scroll', ['$event'])
  @HostListener('window:scroll', ['$event'])
  onScroll(event: UIEvent) {
    const aboutSection = document.getElementById('about');
    const experienceSection = document.getElementById('experience');
    const projectsSection = document.getElementById('projects');

    const scrollPosition = window.scrollY;
    const offset = 2; // Ajuste adicional de 2px

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
