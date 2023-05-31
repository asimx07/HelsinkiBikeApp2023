describe("StationForm", () => {
  beforeEach(() => {
    cy.visit("http://localhost:5000/journey/create");
  });
  it("should submit the form with mock data", () => {
    const mockData = {
      departure: "2023-05-28T08:30",
      return: "2023-05-29T17:45",
      departureStationID: 123,
      departureStationName: "Mock Departure Station",
      returnStationId: 456,
      returnStationName: "Mock Return Station",
      coveredDistanceInMeters: 789,
      durationInSeconds: "3600",
    };

    cy.get('[data-testid="departure"]').type(mockData.departure);
    cy.get('[data-testid="return"]').type(mockData.return);
    cy.get('[data-testid="departureStationID"]').type(
      mockData.departureStationID
    );
    cy.get('[data-testid="departureStationName"]').type(
      mockData.departureStationName
    );
    cy.get('[data-testid="returnStationId"]').type(mockData.returnStationId);
    cy.get('[data-testid="returnStationName"]').type(
      mockData.returnStationName
    );
    cy.get('[data-testid="coveredDistanceInMeters"]').type(
      mockData.coveredDistanceInMeters
    );
    cy.get('[data-testid="durationInSeconds"]').type(
      mockData.durationInSeconds
    );
    cy.get('[data-testid="submit-btn"]').click();

    cy.url().should("include", "/journeys");
  });
});
