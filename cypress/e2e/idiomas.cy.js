describe("idiomas", () => {
  it("validar idiomas", () => {
    // en ingles
    cy.visit("http://localhost:4200/#about");
    cy.get(".language-select").select("en");
    cy.get(".flag").should("be.visible");
    cy.get(".language-select").contains("en");
    //en español
    cy.get(".language-select").select("es");
    cy.get(".flag").should("be.visible");
    cy.get(".language-select").contains("es");
  });
});
