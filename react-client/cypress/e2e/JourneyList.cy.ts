describe("JourneysList", () => {
  beforeEach(() => {
    cy.visit("http://localhost:5173/journeys"); // Replace with the appropriate URL of your app
  });

  it("renders the table headers correctly", () => {
    cy.get("th").should("have.length", 4); // Check that there are 4 table headers
    cy.get("th").contains("Departure Station");
    cy.get("th").contains("Return Station");
    cy.get("th").contains("Journey Duration (Minutes)");
    cy.get("th").contains("Journey Distance (KMs)");
  });

  it("sorts the table by clicking on a sortable column header", () => {
    cy.get("th").contains("Journey Duration (Minutes)").click(); // Click on the sortable column header to sort by duration
    // Add assertions to verify that the table is sorted correctly

    // Repeat the same for other sortable columns if needed
  });

  /*  it("displays the table rows correctly", () => {
    cy.get("tr").should("have.length", 11); // Check that there are 11 table rows (including the header row)

    // Add assertions to verify the content of specific table cells

    // Example assertions for the first row
    cy.get("tr").eq(1).contains("Departure Station Name"); // Replace "Departure Station Name" with the expected value
    cy.get("tr").eq(1).contains("Return Station Name"); // Replace "Return Station Name" with the expected value
    cy.get("tr").eq(1).contains("123.45"); // Replace "123.45" with the expected value for journey duration
    cy.get("tr").eq(1).contains("67.89"); // Replace "67.89" with the expected value for journey distance

    // Repeat the same for other rows if needed
  });
*/
  it("changes the page size when selecting a new value from the rows per page dropdown", () => {
    cy.contains("Rows per page:").click(); // Click on the dropdown to open the options
    cy.get('[role="presentation"]').contains("25").click(); // Click on the option with the desired page size
    // Add assertions to verify that the page size is updated correctly

    // Repeat the same for other values from the dropdown if needed
  });

  it("navigates to the next page when clicking on the next page button", () => {
    cy.get(
      ".MuiTablePagination-actions button[aria-label='Next page']"
    ).click(); // Click on the next page button
    // Add assertions to verify that the next page is displayed

    // Repeat the same for previous page button if needed
  });
});
