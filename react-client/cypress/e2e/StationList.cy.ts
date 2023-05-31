describe("StationsList", () => {
  beforeEach(() => {
    cy.visit("localhost:5000/stations");
  });

  it("should display the table with correct columns", () => {
    cy.get("[data-testid=column-header-ID]").should("exist");
    cy.get("[data-testid=column-header-Name]").should("exist");
    cy.get("[data-testid=column-header-Adress]").should("exist");
    cy.get("[data-testid=column-header-Kaupunki]").should("exist");
    cy.get("[data-testid=column-header-Operaattor]").should("exist");
    cy.get("[data-testid=column-header-Kapasiteet]").should("exist");
  });

  it("should navigate to the create station page when 'Add Station' button is clicked", () => {
    cy.get("[data-testid=add-station-button]").click();
    cy.url().should("include", "/station/create");
  });

  it("should navigate to a specific station page when a row is clicked", () => {
    cy.get("[data-testid^=row-]").first().click();
    cy.url().should("include", "/station/");
  });
});
