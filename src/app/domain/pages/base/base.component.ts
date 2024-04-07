import { Component } from '@angular/core';

@Component({
  selector: 'app-base',
  templateUrl: './base.component.html',
  styleUrls: ['./base.component.scss'],
})
export class BaseComponent {
  aboutContent: string = `
Frontend Engineer con alrededor de 5 años de experiencia y aprendizaje continuo,
Me especializo en el desarrollo de <span class='important'>aplicaciones web & móviles híbridas</span> con tecnologías como <span class='important'>Angular</span> desde versiones más antiguas hasta las más modernas (5-17), <span class='important'>RxJs, JavaScript, TypeScript, React, Ionic, Capacitor, Cordova, NgRx (Redux), Git,</span> entre otras.

Tengo una sólida experiencia en la implementación de Metodologías Ágiles, especialmente SCRUM y habilidades excepcionales en la <span class='important'>gestión de proyectos</span>. Mi experiencia también incluye el uso de <span class='important'>testing (TDD)</span> y la implementación continua de integración y entrega <span class='important'>CI/CD (Jenkins)</span>, lo que otorga un resultado excelente con una alta calidad.

Contengo también destreza en el uso de herramientas de gestión como <span class='important'>Jira y Confluence</span>, lo que es fundamental para coordinar equipos y mantener una comunicación efectiva en proyectos multifuncionales.

Además de mi enfoque técnico, mi nivel de <span class='important'>inglés B1</span> me permite mantener una conversación estable en un entorno internacional, lo que ha sido invaluable en colaboraciones y proyectos globalizados.

Soy una persona completamente <span class='important'>autodidacta</span> y apasionada en el mundo del desarrollo, me encanta enfrentar nuevos desafíos y resolver problemas de manera creativa. Mi capacidad para adaptarme rápidamente a nuevas tecnologías y entornos me ha permitido abordar proyectos diversos con confianza y eficacia.
    `;
}
