import { Component, OnInit } from '@angular/core';
import { UtilService } from '../../shared/services/util/util.service';
import { TranslationService } from '../../shared/services/translation/translation.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-base',
  templateUrl: './base.component.html',
  styleUrls: ['./base.component.scss'],
})
export class BaseComponent implements OnInit {
  aboutContent$!: Observable<string>;

  constructor(
    private utilService: UtilService,
    private translationService: TranslationService
  ) {}

  ngOnInit(): void {
    this.aboutContent$ = this.translationService.getAbout();
  }
}
