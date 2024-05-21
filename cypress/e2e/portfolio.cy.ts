describe('Prueba de portfolio', () => {
  it('Visitar localhost con puerto 4200', () => {
    cy.visit('http://local:4200/');
  });
});
