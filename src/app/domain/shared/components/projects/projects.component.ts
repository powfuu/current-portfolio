import { Component, OnInit, OnDestroy, signal, computed } from '@angular/core';
import { Subscription, Observable } from 'rxjs';
import { Projects } from '../../models/projects.model';
import { ModalService } from '../../services/modal/modal.service';
import { TranslationService } from '../../services/translation/translation.service';
import { ProjectsModalComponent } from '../projects-modal/projects-modal.component';
import { AsyncPipe } from '@angular/common';
import { UtilService } from '../../services/util/util.service';
import { NgIcon } from '@ng-icons/core';
import { RevealOnScrollDirective } from '../../directives/reveal-on-scroll.directive';
import { TiltOnHoverDirective } from '../../directives/tilt-on-hover.directive';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss'],
  standalone: true,
  imports: [ProjectsModalComponent, AsyncPipe, NgIcon, RevealOnScrollDirective, TiltOnHoverDirective],
})
export class ProjectsComponent implements OnInit, OnDestroy {
  isTransitioning = false;
  projectsText$!: Observable<string>;
  projectSelected!: Projects;

  private sub!: Subscription;
  private readonly allProjects = signal<Projects[]>([]);
  private readonly pageSize = 6;

  readonly currentPage = signal(1);
  readonly totalPages = computed(() => Math.ceil(this.allProjects().length / this.pageSize));

  readonly paginatedProjects = computed(() => {
    const start = (this.currentPage() - 1) * this.pageSize;
    return this.allProjects().slice(start, start + this.pageSize);
  });

  readonly visiblePages = computed<(number | null)[]>(() => {
    const total = this.totalPages();
    const current = this.currentPage();
    if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);
    const pages: (number | null)[] = [1];
    if (current > 3) pages.push(null);
    for (let i = Math.max(2, current - 1); i <= Math.min(total - 1, current + 1); i++) pages.push(i);
    if (current < total - 2) pages.push(null);
    pages.push(total);
    return pages;
  });

  constructor(
    private modalService: ModalService,
    private translationService: TranslationService,
    private utilService: UtilService
  ) {}

  ngOnInit(): void {
    this.projectsText$ = this.translationService.getProjectsText();
    this.sub = this.translationService.getProjectsData().subscribe(projects => {
      this.allProjects.set(projects);
      this.currentPage.set(1);
    });
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }

  changePage(page: number): void {
    if (page < 1 || page > this.totalPages() || page === this.currentPage()) return;
    this.isTransitioning = true;
    setTimeout(() => {
      this.currentPage.set(page);
      this.isTransitioning = false;
      document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 180);
  }

  openProjectsModal(project: Projects): void {
    this.projectSelected = project;
    this.modalService.openProjectsModal();
  }

  private readonly topAlignedIds = new Set([112, 113, 115]);

  isTopAligned(id: number): boolean {
    return this.topAlignedIds.has(id);
  }

  getSkillIcon(skill: string): string {
    return this.utilService.getIconForSkill(skill);
  }

  getSkillColor(skill: string): string {
    return this.utilService.getIconColorForSkill(skill);
  }

  trackByFn(index: number, _item: unknown): number {
    return index;
  }
}
