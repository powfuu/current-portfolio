describe('pruebas automatizadas modales', () => {
  beforeEach(() => {
    cy.visit('http://localhost:4200/#about');
  });

  it('validar modal experiencia', () => {
    cy.get('#about').scrollIntoView();
    cy.get('.experience-content > :nth-child(2)').should('be.visible');
    cy.get('.experience-content > :nth-child(2)').click({ force: true });
  });

  it('validar modal proyectos', () => {
    cy.get('.active > a').click({ force: true });
    cy.get('.projects-content > :nth-child(1)').click({ force: true });
  });
});
