import { Component, OnInit } from '@angular/core';
import { PortfolioService } from '../../services/portfolio/portfolio.service';
import { Observable } from 'rxjs';
import { Experience } from '../../models/experience.model';
import { ModalService } from '../../services/modal/modal.service';
import { TranslationService } from '../../services/translation/translation.service';
import { ExperienceModalComponent } from '../experience-modal/experience-modal.component';
import { NgClass, AsyncPipe } from '@angular/common';
import { UtilService } from '../../services/util/util.service';
import { NgIcon } from '@ng-icons/core';
import { RevealOnScrollDirective } from '../../directives/reveal-on-scroll.directive';
import { TiltOnHoverDirective } from '../../directives/tilt-on-hover.directive';

@Component({
    selector: 'app-experience',
    templateUrl: './experience.component.html',
    styleUrls: ['./experience.component.scss'],
    standalone: true,
    imports: [
    NgClass,
    ExperienceModalComponent,
    AsyncPipe,
    NgIcon,
    RevealOnScrollDirective,
    TiltOnHoverDirective
],
})
export class ExperienceComponent implements OnInit {
  isHovered: string | null = null;
  experience$!: Observable<Experience[]>;
  experienceSelected!: Experience;
  constructor(
    private modalService: ModalService,
    private translationService: TranslationService,
    private utilService: UtilService
  ) {}
  ngOnInit(): void {
    this.getExperience();
  }

  getExperience(): void {
    this.experience$ = this.translationService.getExperienceData();
  }

  openExperienceModal(experience: Experience): void {
    this.experienceSelected = experience;
    this.modalService.openExperienceModal();
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
