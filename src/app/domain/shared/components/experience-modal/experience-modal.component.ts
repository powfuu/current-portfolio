import { Component, Input, OnInit } from '@angular/core';
import { ModalService } from '../../services/modal/modal.service';
import { Observable } from 'rxjs';
import { Experience } from '../../models/experience.model';
import { NgIcon } from '@ng-icons/core';
import { AsyncPipe } from '@angular/common';

@Component({
    selector: 'experience-modal',
    templateUrl: './experience-modal.component.html',
    styleUrls: ['./experience-modal.component.scss'],
    standalone: true,
    imports: [
    NgIcon,
    AsyncPipe
],
})
export class ExperienceModalComponent implements OnInit {
  @Input() experience!: Experience;
  isModalOpen$!: Observable<boolean>;

  constructor(private modalService: ModalService) {}

  ngOnInit(): void {
    this.isModalOpen$ = this.modalService.experienceModalStatus$;
  }

  closeModal() {
    this.modalService.closeExperienceModal();
  }

  trackByFn(index: number, item: any) {
    return item.id;
  }
}
