import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { TranslationService } from '../../services/translation/translation.service';
import { Technologies } from '../../models/technologies.model';
import { AsyncPipe, TitleCasePipe } from '@angular/common';
import { NgIcon } from '@ng-icons/core';
import { UtilService } from '../../services/util/util.service';

@Component({
    selector: 'app-technologies',
    templateUrl: './technologies.component.html',
    styleUrls: ['./technologies.component.scss'],
    standalone: true,
    imports: [
    AsyncPipe,
    TitleCasePipe,
    NgIcon
],
})
export class TechnologiesComponent implements OnInit {
  technologiesText$!: Observable<string>;
  technologies$!: Observable<Technologies[]>;

  constructor(
    private translationService: TranslationService,
    private utilService: UtilService
  ) {}

  ngOnInit(): void {
    this.getTranslations();
    this.getTechnologies();
  }

  getTechnologies(): void {
    this.technologies$ = this.translationService.getTechnologiesData();
  }

  getTranslations(): void {
    this.technologiesText$ = this.translationService.getTech();
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
