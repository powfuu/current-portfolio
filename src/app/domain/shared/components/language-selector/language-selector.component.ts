import { Component, OnInit, ElementRef, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgIcon } from '@ng-icons/core';
import { UtilService } from '../../services/util/util.service';
import { TranslationService } from '../../services/translation/translation.service';
import { animate, state, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-language-selector',
  standalone: true,
  imports: [CommonModule, NgIcon],
  templateUrl: './language-selector.component.html',
  styleUrls: ['./language-selector.component.scss'],
  animations: [
    trigger('dropdownState', [
      state('closed', style({
        height: '0',
        opacity: 0,
        overflow: 'hidden',
        padding: '0'
      })),
      state('open', style({
        height: '*',
        opacity: 1,
        padding: '5px'
      })),
      transition('closed => open', [
        animate('200ms ease-out')
      ]),
      transition('open => closed', [
        animate('200ms ease-in')
      ])
    ]),
    trigger('rotateChevron', [
      state('default', style({ transform: 'rotate(0)' })),
      state('rotated', style({ transform: 'rotate(180deg)' })),
      transition('default <=> rotated', animate('200ms ease-out'))
    ])
  ]
})
export class LanguageSelectorComponent implements OnInit {
  isOpen = false;
  currentLang: 'es' | 'en' = 'es';

  constructor(
    private utilService: UtilService,
    private translationService: TranslationService,
    private elementRef: ElementRef
  ) {}

  ngOnInit() {
    this.currentLang = this.utilService.langIsEs() ? 'es' : 'en';
  }

  toggleDropdown(event?: Event) {
    if (event) {
      event.stopPropagation();
    }
    this.isOpen = !this.isOpen;
  }

  selectLanguage(lang: 'es' | 'en') {
    this.currentLang = lang;
    this.utilService.setLang(lang);
    this.translationService.refreshTranslations();
    this.isOpen = false;
  }

  get otherLang() {
    return this.currentLang === 'es' ? 'en' : 'es';
  }

  @HostListener('document:click', ['$event'])
  onClickOutside(event: MouseEvent) {
    if (!this.elementRef.nativeElement.contains(event.target)) {
      this.isOpen = false;
    }
  }
}
