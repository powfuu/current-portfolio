import { Component, Input, OnInit } from '@angular/core';
import { ModalService } from '../../services/modal/modal.service';
import { Observable } from 'rxjs';
import { Projects } from '../../models/projects.model';

@Component({
  selector: 'projects-modal',
  templateUrl: './projects-modal.component.html',
  styleUrls: ['./projects-modal.component.scss'],
})
export class ProjectsModalComponent implements OnInit {
  @Input() project!: Projects;
  isModalOpen$!: Observable<boolean>;

  constructor(private modalService: ModalService) {}

  ngOnInit(): void {
    this.isModalOpen$ = this.modalService.projectsModalStatus$;
  }

  closeModal() {
    this.modalService.closeProjectsModal();
  }
}
