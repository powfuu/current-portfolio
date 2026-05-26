import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { TranslationService } from '../../services/translation/translation.service';
import { Technologies } from '../../models/technologies.model';
import { AsyncPipe, TitleCasePipe } from '@angular/common';
import { NgIcon } from '@ng-icons/core';
import { UtilService } from '../../services/util/util.service';
import { RevealOnScrollDirective } from '../../directives/reveal-on-scroll.directive';

interface TechRow {
  items: Technologies[];
  reverse: boolean;
  duration: number;
}

@Component({
    selector: 'app-technologies',
    templateUrl: './technologies.component.html',
    styleUrls: ['./technologies.component.scss'],
    standalone: true,
    imports: [
    AsyncPipe,
    TitleCasePipe,
    NgIcon,
    RevealOnScrollDirective,
  ],
})
export class TechnologiesComponent implements OnInit {
  technologiesText$!: Observable<string>;
  rows$!: Observable<TechRow[]>;

  constructor(
    private translationService: TranslationService,
    private utilService: UtilService
  ) {}

  ngOnInit(): void {
    this.technologiesText$ = this.translationService.getTech();
    this.rows$ = this.translationService.getTechnologiesData().pipe(
      map(techs => {
        const q = Math.ceil(techs.length / 4);
        // Each row gets a quarter; pad last rows with items from other quarters for fullness
        const r1 = techs.slice(0, q);
        const r2 = techs.slice(q, q * 2);
        const r3 = techs.slice(q * 2, q * 3);
        const r4 = techs.slice(q * 3);
        // pad short rows by recycling from beginning so no row feels sparse
        const pad = (arr: Technologies[], min: number) =>
          arr.length < min ? [...arr, ...techs.slice(0, min - arr.length)] : arr;
        return [
          { items: pad(r1, q), reverse: false, duration: 55 },
          { items: pad(r2, q), reverse: true,  duration: 65 },
          { items: pad(r3, q), reverse: false, duration: 58 },
          { items: pad(r4, q), reverse: true,  duration: 62 },
        ];
      })
    );
  }

  getSkillIcon(skill: string): string {
    return this.utilService.getIconForSkill(skill);
  }

  getSkillColor(skill: string): string {
    return this.utilService.getIconColorForSkill(skill);
  }
}
