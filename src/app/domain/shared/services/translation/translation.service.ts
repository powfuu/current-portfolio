import { Injectable } from '@angular/core';
import { UtilService } from '../util/util.service';
import { BehaviorSubject, first, forkJoin, Observable, take } from 'rxjs';
import { Experience } from '../../models/experience.model';
import { Projects } from '../../models/projects.model';
import { PortfolioService } from '../portfolio/portfolio.service';
import { Technologies } from '../../models/technologies.model';

@Injectable({
  providedIn: 'root',
})
export class TranslationService {
  about$: BehaviorSubject<string> = new BehaviorSubject<string>('');
  description$: BehaviorSubject<string> = new BehaviorSubject<string>('');
  aboutSideBar$: BehaviorSubject<string> = new BehaviorSubject<string>('');
  projectsText$: BehaviorSubject<string> = new BehaviorSubject<string>('');
  experience$: BehaviorSubject<string> = new BehaviorSubject<string>('');
  projects$: BehaviorSubject<string> = new BehaviorSubject<string>('');
  technologies$: BehaviorSubject<string> = new BehaviorSubject<string>('');
  experienceData$: BehaviorSubject<Experience[]> = new BehaviorSubject<
    Experience[]
  >([]);
  projectsData$: BehaviorSubject<Projects[]> = new BehaviorSubject<Projects[]>(
    []
  );
  technologiesData$: BehaviorSubject<Technologies[]> = new BehaviorSubject<
    Technologies[]
  >([]);

  constructor(
    private utilService: UtilService,
    private portfolioService: PortfolioService
  ) {}

  refreshTranslations(): void {
    this.refreshAbout();
    this.refreshSideBar();
    this.refreshData();
    this.refreshProjectsTexts();
  }

  getExperienceData(): Observable<Experience[]> {
    return this.experienceData$;
  }

  getProjectsData(): Observable<Projects[]> {
    return this.projectsData$;
  }

  getTechnologiesData(): Observable<Technologies[]> {
    return this.technologiesData$;
  }

  getAbout(): Observable<string> {
    return this.about$;
  }

  getProjectsText(): Observable<string> {
    return this.projectsText$;
  }

  getDescription(): Observable<string> {
    return this.description$;
  }

  getAboutSideBar(): Observable<string> {
    return this.aboutSideBar$;
  }

  getExperience(): Observable<string> {
    return this.experience$;
  }

  getProjects(): Observable<string> {
    return this.projects$;
  }

  getTech(): Observable<string> {
    return this.technologies$;
  }

  refreshProjectsTexts(): void {
    if (this.utilService.langIsEs()) {
      this.projectsText$.next('Algunos de mis proyectos');
    } else {
      this.projectsText$.next('Some of my projects');
    }
  }

  refreshData(): void {
    forkJoin([
      this.portfolioService.getExperience().pipe(take(1)),
      this.portfolioService.getProjects().pipe(take(1)),
      this.portfolioService.getTechnologies().pipe(take(1)),
    ])
      .pipe(first())
      .subscribe(([experience, projects, technologies]) => {
        this.experienceData$.next(experience);
        this.projectsData$.next(projects);
        if (this.technologiesData$.getValue().length === 0) {
          this.technologiesData$.next(technologies);
        }
      });
  }

  refreshSideBar(): void {
    const langIsEs = this.utilService.langIsEs();
    if (langIsEs) {
      this.description$.next(
        'Desarrollo de soluciones IT atractivas, escalables y mantenibles.'
      );
      this.aboutSideBar$.next('ACERCA DE MÍ');
      this.experience$.next('EXPERIENCIA');
      this.projects$.next('PROYECTOS');
      this.technologies$.next('TECNOLOGÍAS');
    } else {
      this.description$.next(
        'Development of attractive, scalable, and maintainable IT solutions.'
      );
      this.aboutSideBar$.next('ABOUT ME');
      this.experience$.next('EXPERIENCE');
      this.projects$.next('PROJECTS');
      this.technologies$.next('TECHNOLOGIES');
    }
  }

  refreshAbout(): void {
    const aboutEn = `I am a Frontend Engineer with about 5 years of experience and continuous learning. I specialize in developing <span class='important'>hybrid web & mobile applications</span> using technologies like <span class='important'>Angular</span> from older versions to the latest ones (5-17), <span class='important'>RxJs, JavaScript, TypeScript, React, Ionic, Capacitor, Cordova, NgRx (Redux), Git,</span> among others.

I have solid experience implementing Agile Methodologies, especially SCRUM, and exceptional skills in <span class='important'>project management</span>. My experience also includes using <span class='important'>testing (TDD)</span> and continuously implementing integration and delivery <span class='important'>CI/CD (Jenkins)</span>, which results in excellent outcomes with high quality.

I also have expertise in using management tools like <span class='important'>Jira and Confluence</span>, which are essential for coordinating teams and maintaining effective communication in multifunctional projects.

In addition to my technical focus, my <span class='important'>English B1</span> level allows me to maintain a stable conversation in an international environment, which has been invaluable in collaborations and globalized projects.

I am a completely <span class='important'>self-taught</span> and passionate person in the world of development, I love facing new challenges and solving problems creatively. My ability to quickly adapt to new technologies and environments has allowed me to confidently and effectively tackle diverse projects.
    `;
    const aboutEs = `Frontend Engineer con alrededor de 5 años de experiencia y aprendizaje continuo,
Me especializo en el desarrollo de <span class='important'>aplicaciones web & móviles híbridas</span> con tecnologías como <span class='important'>Angular</span> desde versiones más antiguas hasta las más modernas (5-17), <span class='important'>RxJs, JavaScript, TypeScript, React, Ionic, Capacitor, Cordova, NgRx (Redux), Git,</span> entre otras.

Tengo una sólida experiencia en la implementación de Metodologías Ágiles, especialmente SCRUM y habilidades excepcionales en la <span class='important'>gestión de proyectos</span>. Mi experiencia también incluye el uso de <span class='important'>testing (TDD)</span> y la implementación continua de integración y entrega <span class='important'>CI/CD (Jenkins)</span>, lo que otorga un resultado excelente con una alta calidad.

Contengo también destreza en el uso de herramientas de gestión como <span class='important'>Jira y Confluence</span>, lo que es fundamental para coordinar equipos y mantener una comunicación efectiva en proyectos multifuncionales.

Además de mi enfoque técnico, mi nivel de <span class='important'>inglés B1</span> me permite mantener una conversación estable en un entorno internacional, lo que ha sido invaluable en colaboraciones y proyectos globalizados.

Soy una persona completamente <span class='important'>autodidacta</span> y apasionada en el mundo del desarrollo, me encanta enfrentar nuevos desafíos y resolver problemas de manera creativa. Mi capacidad para adaptarme rápidamente a nuevas tecnologías y entornos me ha permitido abordar proyectos diversos con confianza y eficacia.
    `;
    this.about$.next(this.utilService.langIsEs() ? aboutEs : aboutEn);
  }
}
