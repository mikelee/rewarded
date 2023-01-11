describe('auth tests', () => {
    const username = Cypress.env('username');
    const password = Cypress.env('password');

    it('logs in user' , () => {
        cy.login(username, password);
    });

    it('logs out user' , () => {
        cy.login(username, password);

        cy.get('[data-testid=menu-button]').click();

        cy.contains('Logout').click();

        cy.contains('You have successfully logged out');        
    })
});