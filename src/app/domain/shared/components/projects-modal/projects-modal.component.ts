import { Component, Input, OnInit } from '@angular/core';
import { ModalService } from '../../services/modal/modal.service';
import { Observable } from 'rxjs';
import { Projects } from '../../models/projects.model';
import { NgIcon } from '@ng-icons/core';
import { NgClass, AsyncPipe } from '@angular/common';
import { UtilService } from '../../services/util/util.service';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
    selector: 'projects-modal',
    templateUrl: './projects-modal.component.html',
    styleUrls: ['./projects-modal.component.scss'],
    standalone: true,
    imports: [
    NgClass,
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
      trigger('slideInOut', [
        transition(':enter', [
          style({ transform: 'translateX(100%)' }),
          animate('400ms cubic-bezier(0.25, 0.8, 0.25, 1)', style({ transform: 'translateX(0)' }))
        ]),
        transition(':leave', [
          style({ transform: 'translateX(0)' }),
          animate('300ms cubic-bezier(0.25, 0.8, 0.25, 1)', style({ transform: 'translateX(100%)' }))
        ])
      ])
    ]
})
export class ProjectsModalComponent implements OnInit {
  @Input() project!: Projects;
  isModalOpen$!: Observable<boolean>;

  constructor(
    private modalService: ModalService,
    private utilService: UtilService
  ) {}

  ngOnInit(): void {
    this.isModalOpen$ = this.modalService.projectsModalStatus$;
  }

  closeModal() {
    this.modalService.closeProjectsModal();
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
