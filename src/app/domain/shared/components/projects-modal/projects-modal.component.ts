import { Component, Input, OnInit, OnChanges, SimpleChanges, HostListener, OnDestroy } from '@angular/core';
import { ModalService } from '../../services/modal/modal.service';
import { Observable, Subscription } from 'rxjs';
import { Projects } from '../../models/projects.model';
import { NgIcon } from '@ng-icons/core';
import { AsyncPipe } from '@angular/common';
import { UtilService } from '../../services/util/util.service';
import { trigger, transition, style, animate, group, query, animateChild } from '@angular/animations';
import { ParticlesBackgroundComponent } from '../particles-background/particles-background.component';

@Component({
  selector: 'projects-modal',
  templateUrl: './projects-modal.component.html',
  styleUrls: ['./projects-modal.component.scss'],
  standalone: true,
  imports: [NgIcon, AsyncPipe, ParticlesBackgroundComponent],
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
    trigger('imageFade', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('300ms ease-out', style({ opacity: 1 })),
      ]),
      transition('* => *', [
        style({ opacity: 0 }),
        animate('300ms ease-out', style({ opacity: 1 })),
      ]),
    ]),
    trigger('lightboxFade', [
      transition(':enter', [
        style({ opacity: 0, transform: 'scale(0.88)' }),
        animate('320ms cubic-bezier(0.16, 1, 0.3, 1)', style({ opacity: 1, transform: 'scale(1)' })),
      ]),
      transition(':leave', [
        animate('220ms ease-in', style({ opacity: 0, transform: 'scale(0.92)' })),
      ]),
    ]),
    trigger('sheetReveal', [
      transition(':enter', [
        style({ opacity: 0, transform: 'scale(0.91) translateY(24px)' }),
        group([
          animate('480ms cubic-bezier(0.16, 1, 0.3, 1)', style({ opacity: 1, transform: 'scale(1) translateY(0)' })),
          query('@imageFade', animateChild(), { optional: true }),
        ]),
      ]),
      transition(':leave', [
        animate('300ms cubic-bezier(0.4, 0, 1, 1)', style({ opacity: 0, transform: 'scale(0.94) translateY(16px)' })),
      ]),
    ]),
  ],
})
export class ProjectsModalComponent implements OnInit, OnChanges, OnDestroy {
  @Input() project!: Projects;
  isModalOpen$!: Observable<boolean>;
  currentImgIndex: number = 0;
  isLightboxOpen: boolean = false;
  private isOpen: boolean = false;
  private modalSub!: Subscription;

  constructor(
    private modalService: ModalService,
    private utilService: UtilService
  ) {}

  ngOnInit(): void {
    this.isModalOpen$ = this.modalService.projectsModalStatus$;
    this.modalSub = this.isModalOpen$.subscribe(open => this.isOpen = open);
  }

  ngOnDestroy(): void {
    this.modalSub?.unsubscribe();
  }

  @HostListener('document:keydown', ['$event'])
  onDocKeydown(event: KeyboardEvent): void {
    if (!this.isOpen) return;
    if (event.key === 'ArrowLeft') { event.preventDefault(); this.prevImage(); }
    if (event.key === 'ArrowRight') { event.preventDefault(); this.nextImage(); }
    if (event.key === 'Escape') {
      event.preventDefault();
      if (this.isLightboxOpen) this.closeLightbox();
      else this.closeModal();
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['project']) {
      this.currentImgIndex = 0;
    }
  }

  allImages(): string[] {
    if (!this.project) return [];
    return this.project.imgs?.length ? this.project.imgs : [this.project.img];
  }

  currentHeroImg(): string {
    const imgs = this.allImages();
    return imgs[this.currentImgIndex] ?? this.project?.img;
  }

  hasMultipleImages(): boolean {
    return this.allImages().length > 1;
  }

  prevImage(): void {
    if (this.currentImgIndex > 0) this.currentImgIndex--;
  }

  nextImage(): void {
    if (this.currentImgIndex < this.allImages().length - 1) this.currentImgIndex++;
  }

  setImage(index: number): void {
    this.currentImgIndex = index;
  }

  openLightbox(): void {
    this.isLightboxOpen = true;
    document.body.style.overflow = 'hidden';
  }

  closeLightbox(): void {
    this.isLightboxOpen = false;
    document.body.style.overflow = '';
  }

  closeModal(): void {
    if (this.isLightboxOpen) {
      this.isLightboxOpen = false;
      document.body.style.overflow = '';
    }
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
