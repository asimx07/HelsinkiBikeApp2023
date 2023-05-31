describe("App", () => {
  beforeEach(() => {
    cy.visit("http://localhost:5000");
  });

  it("renders the header correctly", () => {
    cy.get("header").should("be.visible");
    cy.get("header").contains("Helsinki Bike App");
  });

  it("scrolls down when the expand more button is clicked", () => {
    cy.get("[data-testid='expand-more-btn']").click({
      multiple: true,
      force: true,
    });
    cy.get("body").should("have.prop", "scrollTop", Cypress.$(window).height());
  });

  it("displays the journey card", () => {
    cy.get("[data-testid='journey-card']").should("be.visible");
  });

  it("clicks the journey card", () => {
    cy.get("[data-testid='journey-card']").click();
  });

  it("displays the station card", () => {
    cy.get("[data-testid='station-card']").should("be.visible");
  });

  it("clicks the station card", () => {
    cy.get("[data-testid='station-card']").click();
  });
});
