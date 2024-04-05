import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Projects } from '../../models/projects.model';
import { PortfolioService } from '../../services/portfolio.service';
import { ModalService } from '../../services/modal.service';

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
    private portfolioService: PortfolioService,
    private modalService: ModalService
  ) {}
  ngOnInit(): void {
    this.getProjects();
  }

  getProjects(): void {
    this.projects$ = this.portfolioService.getProjects();
  }

  openProjectsModal(project: Projects): void {
    this.projectSelected = project;
    this.modalService.openProjectsModal();
  }
}
