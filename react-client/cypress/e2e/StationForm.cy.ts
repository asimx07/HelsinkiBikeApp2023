describe("StationForm", () => {
  beforeEach(() => {
    cy.visit("http://localhost:5000/station/create");
  });

  it("should submit the form with mock data", () => {
    const mockData = {
      FID: 123,
      ID: 456,
      Nimi: "Mock Nimi",
      Namn: "Mock Namn",
      Name: "Mock Name",
      Osoite: "Mock Osoite",
      Adress: "Mock Address",
      Kaupunki: "Mock Kaupunki",
      Stad: "Mock Stad",
      Operaattor: "Mock Operaattor",
      Kapasiteet: "Mock Kapasiteet",
      x: 789,
      y: 123,
    };

    cy.get('[data-testid="FID"]').type(mockData.FID);
    cy.get('[data-testid="ID"]').type(mockData.ID);
    cy.get('[data-testid="Nimi"]').type(mockData.Nimi);
    cy.get('[data-testid="Namn"]').type(mockData.Namn);
    cy.get('[data-testid="Name"]').type(mockData.Name);
    cy.get('[data-testid="Osoite"]').type(mockData.Osoite);
    cy.get('[data-testid="Adress"]').type(mockData.Adress);
    cy.get('[data-testid="Kaupunki"]').type(mockData.Kaupunki);
    cy.get('[data-testid="Stad"]').type(mockData.Stad);
    cy.get('[data-testid="Operaattor"]').type(mockData.Operaattor);
    cy.get('[data-testid="Kapasiteet"]').type(mockData.Kapasiteet);
    cy.get('[data-testid="x"]').type(mockData.x);
    cy.get('[data-testid="y"]').type(mockData.y);
    cy.get('[data-testid="submit-btn"]').click();

    cy.url().should("include", "/stations"); // Assuming successful form submission redirects to "/stations"
  });
});
