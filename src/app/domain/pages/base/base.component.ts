import { Component, OnInit } from '@angular/core';
import { UtilService } from '../../shared/services/util/util.service';
import { TranslationService } from '../../shared/services/translation/translation.service';
import { Observable } from 'rxjs';
import { TechnologiesComponent } from '../../shared/components/technologies/technologies.component';
import { ProjectsComponent } from '../../shared/components/projects/projects.component';
import { ExperienceComponent } from '../../shared/components/experience/experience.component';
import { AsyncPipe } from '@angular/common';
import { SidebarComponent } from '../../shared/components/sidebar/sidebar.component';

@Component({
  selector: 'app-base',
  templateUrl: './base.component.html',
  styleUrls: ['./base.component.scss'],
  standalone: true,
  imports: [
    SidebarComponent,
    ExperienceComponent,
    ProjectsComponent,
    TechnologiesComponent,
    AsyncPipe
],
})
export class BaseComponent implements OnInit {
  aboutContent$!: Observable<string>;
  skeleton: number[] = [0, 1, 2];

  constructor(
    private utilService: UtilService,
    private translationService: TranslationService
  ) {}

  ngOnInit(): void {
    this.aboutContent$ = this.translationService.getAbout();
  }
}
