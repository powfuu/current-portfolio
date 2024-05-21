import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { TranslationService } from '../../services/translation/translation.service';
import { Technologies } from '../../models/technologies.model';
import { NgIf, NgFor, AsyncPipe, TitleCasePipe } from '@angular/common';

@Component({
    selector: 'app-technologies',
    templateUrl: './technologies.component.html',
    styleUrls: ['./technologies.component.scss'],
    standalone: true,
    imports: [
        NgIf,
        NgFor,
        AsyncPipe,
        TitleCasePipe,
    ],
})
export class TechnologiesComponent implements OnInit {
  technologiesText$!: Observable<string>;
  technologies$!: Observable<Technologies[]>;

  constructor(private translationService: TranslationService) {}

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

  trackByFn(index: number, item: any) {
    return item.id;
  }
}
