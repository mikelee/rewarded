describe('auth tests', () => {
    it('logs in user' , () => {
        const username = Cypress.env('username');
        const password = Cypress.env('password');

        cy.login(username, password);
    });
});