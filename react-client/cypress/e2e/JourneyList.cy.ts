describe("JourneysList", () => {
  beforeEach(() => {
    cy.visit("localhost:5000/journeys");
  });

  it("should display the table with correct columns", () => {
    cy.get("[data-testid=column-header-departureStationName]").should("exist");
    cy.get("[data-testid=column-header-returnStationName]").should("exist");
    cy.get("[data-testid=column-header-durationInSeconds]").should("exist");
    cy.get("[data-testid=column-header-coveredDistanceInMeters]").should(
      "exist"
    );
  });

  it("should navigate to the create journey page when 'Add Journey' button is clicked", () => {
    cy.get("[data-testid=add-journey-button]").click();
    cy.url().should("include", "/journey/create");
  });

  // Add more test cases as needed...
});
