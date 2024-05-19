import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { TranslationService } from '../../services/translation/translation.service';
import { Technologies } from '../../models/technologies.model';

@Component({
  selector: 'app-technologies',
  templateUrl: './technologies.component.html',
  styleUrls: ['./technologies.component.scss'],
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
