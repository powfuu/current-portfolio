import { Component, OnInit } from '@angular/core';
import { PortfolioService } from '../../services/portfolio.service';
import { Observable } from 'rxjs';
import { Experience } from '../../models/experience.model';
import { ModalService } from '../../services/modal.service';

@Component({
  selector: 'app-experience',
  templateUrl: './experience.component.html',
  styleUrls: ['./experience.component.scss'],
})
export class ExperienceComponent implements OnInit {
  isHovered: string | null = null;
  experience$!: Observable<Experience[]>;
  experienceSelected!: Experience;
  constructor(
    private portfolioService: PortfolioService,
    private modalService: ModalService
  ) {}
  ngOnInit(): void {
    this.getExperience();
  }

  getExperience(): void {
    this.experience$ = this.portfolioService.getExperience();
  }

  openExperienceModal(experience: Experience): void {
    this.experienceSelected = experience;
    this.modalService.openExperienceModal();
  }
}
