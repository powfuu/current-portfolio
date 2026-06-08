import { Component, Input, OnInit } from '@angular/core';
import { ModalService } from '../../services/modal/modal.service';
import { Observable } from 'rxjs';
import { Experience } from '../../models/experience.model';
import { NgIcon } from '@ng-icons/core';
import { AsyncPipe } from '@angular/common';
import { UtilService } from '../../services/util/util.service';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'experience-modal',
  templateUrl: './experience-modal.component.html',
  styleUrls: ['./experience-modal.component.scss'],
  standalone: true,
  imports: [NgIcon, AsyncPipe],
  animations: [
    trigger('backdropFade', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('280ms ease-out', style({ opacity: 1 })),
      ]),
      transition(':leave', [
        animate('250ms ease-in', style({ opacity: 0 })),
      ]),
    ]),
    trigger('panelSlide', [
      transition(':enter', [
        style({ transform: 'translateX(100%)' }),
        animate('500ms cubic-bezier(0.16, 1, 0.3, 1)', style({ transform: 'translateX(0)' })),
      ]),
      transition(':leave', [
        animate('380ms cubic-bezier(0.4, 0, 1, 1)', style({ transform: 'translateX(100%)' })),
      ]),
    ]),
  ],
})
export class ExperienceModalComponent implements OnInit {
  @Input() experience!: Experience;
  isModalOpen$!: Observable<boolean>;

  constructor(
    private modalService: ModalService,
    private utilService: UtilService
  ) {}

  ngOnInit(): void {
    this.isModalOpen$ = this.modalService.experienceModalStatus$;
  }

  closeModal(): void {
    this.modalService.closeExperienceModal();
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
