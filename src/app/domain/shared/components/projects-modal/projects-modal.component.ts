import { Component, Input, OnInit } from '@angular/core';
import { ModalService } from '../../services/modal/modal.service';
import { Observable } from 'rxjs';
import { Projects } from '../../models/projects.model';
import { NgIcon } from '@ng-icons/core';
import { AsyncPipe } from '@angular/common';
import { UtilService } from '../../services/util/util.service';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'projects-modal',
  templateUrl: './projects-modal.component.html',
  styleUrls: ['./projects-modal.component.scss'],
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
    trigger('sheetReveal', [
      transition(':enter', [
        style({ opacity: 0, transform: 'scale(0.91) translateY(24px)' }),
        animate('480ms cubic-bezier(0.16, 1, 0.3, 1)', style({ opacity: 1, transform: 'scale(1) translateY(0)' })),
      ]),
      transition(':leave', [
        animate('300ms cubic-bezier(0.4, 0, 1, 1)', style({ opacity: 0, transform: 'scale(0.94) translateY(16px)' })),
      ]),
    ]),
  ],
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

  closeModal(): void {
    this.modalService.closeProjectsModal();
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
