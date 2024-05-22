describe("validar idiomas", () => {
  beforeEach(() => {
    cy.visit("http://localhost:4200/#about");
    cy.get(".flag").should("be.visible");
  });

  it("validar idioma es", () => {
    //en español
    cy.get(".language-select").select("es");
    cy.get(".language-selectt").contains("es");
  });

  it("validar idioma en", () => {
    // en ingles
    cy.get(".language-select").select("en");
    cy.get(".language-select").contains("en");
  });
});
