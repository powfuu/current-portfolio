import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ModalService {
  private experienceModalStatusSubject = new Subject<boolean>();
  experienceModalStatus$ = this.experienceModalStatusSubject.asObservable();

  private projectsModalStatusSubject = new Subject<boolean>();
  projectsModalStatus$ = this.projectsModalStatusSubject.asObservable();

  openExperienceModal() {
    this.experienceModalStatusSubject.next(true);
  }

  closeExperienceModal() {
    this.experienceModalStatusSubject.next(false);
  }

  openProjectsModal() {
    this.projectsModalStatusSubject.next(true);
  }

  closeProjectsModal() {
    this.projectsModalStatusSubject.next(false);
  }
}
