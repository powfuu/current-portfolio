import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Projects } from '../../models/projects.model';
import { PortfolioService } from '../../services/portfolio/portfolio.service';
import { ModalService } from '../../services/modal/modal.service';
import { TranslationService } from '../../services/translation/translation.service';
import { ProjectsModalComponent } from '../projects-modal/projects-modal.component';
import { NgClass, AsyncPipe } from '@angular/common';
import { UtilService } from '../../services/util/util.service';
import { NgIcon } from '@ng-icons/core';

@Component({
    selector: 'app-projects',
    templateUrl: './projects.component.html',
    styleUrls: ['./projects.component.scss'],
    standalone: true,
    imports: [
    NgClass,
    ProjectsModalComponent,
    AsyncPipe,
    NgIcon
],
})
export class ProjectsComponent {
  isHovered: string | null = null;
  projects$!: Observable<Projects[]>;
  projectsText$!: Observable<string>;
  projectSelected!: Projects;

  constructor(
    private modalService: ModalService,
    private translationService: TranslationService,
    private utilService: UtilService
  ) {}

  ngOnInit(): void {
    this.getProjects();
    this.getTranslations();
  }

  getTranslations(): void {
    this.projectsText$ = this.translationService.getProjectsText();
  }

  getProjects(): void {
    this.projects$ = this.translationService.getProjectsData();
  }

  openProjectsModal(project: Projects): void {
    this.projectSelected = project;
    this.modalService.openProjectsModal();
  }
  
  getSkillIcon(skill: string): string {
    return this.utilService.getIconForSkill(skill);
  }

  getSkillColor(skill: string): string {
    return this.utilService.getIconColorForSkill(skill);
  }

  trackByFn(index: number, item: any) {
    return item.id;
  }
}
