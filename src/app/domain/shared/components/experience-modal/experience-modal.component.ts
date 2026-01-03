import { Component, Input, OnInit } from '@angular/core';
import { ModalService } from '../../services/modal/modal.service';
import { Observable } from 'rxjs';
import { Experience } from '../../models/experience.model';
import { NgIcon } from '@ng-icons/core';
import { AsyncPipe } from '@angular/common';
import { UtilService } from '../../services/util/util.service';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
    selector: 'experience-modal',
    templateUrl: './experience-modal.component.html',
    styleUrls: ['./experience-modal.component.scss'],
    standalone: true,
    imports: [
    NgIcon,
    AsyncPipe
],
    animations: [
      trigger('fadeInOut', [
        transition(':enter', [
          style({ opacity: 0 }),
          animate('300ms ease-out', style({ opacity: 1 }))
        ]),
        transition(':leave', [
          animate('300ms ease-in', style({ opacity: 0 }))
        ])
      ]),
      trigger('slideUp', [
        transition(':enter', [
          style({ top: '100%', opacity: 0, transform: 'translate(-50%, -50%)' }),
          animate('400ms cubic-bezier(0.25, 0.8, 0.25, 1)', style({ top: '50%', opacity: 1, transform: 'translate(-50%, -50%)' }))
        ]),
        transition(':leave', [
          style({ transform: 'translate(-50%, -50%)' }),
          animate('300ms cubic-bezier(0.25, 0.8, 0.25, 1)', style({ top: '100%', opacity: 0, transform: 'translate(-50%, -50%)' }))
        ])
      ])
    ]
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

  closeModal() {
    this.modalService.closeExperienceModal();
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
