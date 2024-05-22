describe('Prueba de portfolio', () => {
  beforeEach(() => {
    cy.visit('http://localhost:4200/#about');
  });

  it('Cambiar a dark mode', () => {
    cy.get('body').should('have.class', 'dark').and('not.have.class', 'light');
    cy.get('.theme-toggle').click();
    cy.get('body').should('have.class', 'light').and('not.have.class', 'dark');
  });

  it('validar que el  link de IN abra', () => {
    cy.get('[href="https://www.linkedin.com/in/everit-jhon"]').click();
  });

  it('validar que el link de PDF cv ', () => {
    cy.get('#cv > ng-icon >svg >path ').click({ force: true });
  });

  it('validar que el link de enviar correo abra ', () => {
    cy.get(
      '[href="mailto:everitjhon@gmail.com?subject=Contacto - Everit Jhon, Frontend Developer"] > ng-icon > svg > path'
    );
  });

  it('validar que la flecha se presente y suba', () => {
    cy.scrollTo(0, 200).then(() => {
      cy.get('.scroll-top').should('be.visible');
      cy.get('.scroll-top').click({ force: true });
    });
  });

  it('validar la navegacion del menu', () => {
    //Prueba de tec
    cy.get(':nth-child(4) > a').click();
    cy.get('.technologies-content').should('be.visible');

    //Prueba de proyectos
    cy.get('ul > :nth-child(3) > a').click();
    cy.get('.projects-content').should('be.visible');

    //prueba de experiencia
    cy.get(':nth-child(2) > a').click();
    cy.get('.experience-content').should('be.visible');

    // prueba de acerca de mi
    cy.get('ul > :nth-child(1) > a').click();
    cy.get('pre').should('be.visible');
  });
});
