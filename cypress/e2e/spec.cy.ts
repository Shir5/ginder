
describe('template spec', () => {
  it('passes', () => {
    cy.visit('https://ginder-rho.vercel.app/')
    cy.wait(3000); // Adjust the wait time as needed

  })
  it('should open login modal when "LOG IN" button is clicked', () => {
    // Click on the "LOG IN" button
    cy.get('button').contains('LOG IN').click(); // Example selector

    // Assert that the login modal is visible
    cy.get('#login-modal').should('be.visible');
  
    });
    it('should enter values into the login input field', () => {
      // Read data from the fixture file
      cy.fixture('login.json').then((loginData) => {
        // Type values into the input fields using data from the fixture
        cy.get('input[name="identifier-input"]').type(loginData.username);
        cy.get('input[name="password-input"]').type(loginData.password);
      });

      cy.get('button').contains('Submit').click(); // Example selector
      cy.wait(1000)
      cy.url().should('include', '/MainPage'); // Adjust the URL as needed


    });


})