import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExperienceComponent } from './components/experience/experience.component';
import { ProjectsComponent } from './components/projects/projects.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import {
  ionLogoLinkedin,
  ionMail,
  ionDownload,
  ionClose,
  ionChevronUp,
} from '@ng-icons/ionicons';
import { NgIconsModule } from '@ng-icons/core';
import { HttpClientModule } from '@angular/common/http';
import { PortfolioService } from './services/portfolio/portfolio.service';
import { ProjectsModalComponent } from './components/projects-modal/projects-modal.component';
import { ExperienceModalComponent } from './components/experience-modal/experience-modal.component';
import { TechnologiesComponent } from './components/technologies/technologies.component';

@NgModule({
  declarations: [
    ExperienceComponent,
    ProjectsComponent,
    SidebarComponent,
    ExperienceModalComponent,
    ProjectsModalComponent,
    TechnologiesComponent,
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    NgIconsModule.withIcons({
      ionLogoLinkedin,
      ionMail,
      ionClose,
      ionDownload,
      ionChevronUp,
    }),
  ],
  providers: [PortfolioService],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  exports: [
    ExperienceComponent,
    ProjectsComponent,
    SidebarComponent,
    ExperienceModalComponent,
    ProjectsModalComponent,
    TechnologiesComponent,
  ],
})
export class SharedModule {}
