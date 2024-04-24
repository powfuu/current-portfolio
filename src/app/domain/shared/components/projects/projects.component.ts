import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Projects } from '../../models/projects.model';
import { PortfolioService } from '../../services/portfolio/portfolio.service';
import { ModalService } from '../../services/modal/modal.service';
import { TranslationService } from '../../services/translation/translation.service';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss'],
})
export class ProjectsComponent {
  isHovered: string | null = null;
  projects$!: Observable<Projects[]>;
  projectSelected!: Projects;

  constructor(
    private modalService: ModalService,
    private translationService: TranslationService
  ) {}
  ngOnInit(): void {
    this.getProjects();
  }

  getProjects(): void {
    this.projects$ = this.translationService.getProjectsData();
  }

  openProjectsModal(project: Projects): void {
    this.projectSelected = project;
    this.modalService.openProjectsModal();
  }
}
