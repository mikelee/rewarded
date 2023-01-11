describe('auth tests', () => {
    it('logs in user' , () => {
        const username = Cypress.env('username');
        const password = Cypress.env('password');

        if (typeof password !== 'string' || !password) {
            throw new Error('Missing password value, set using cypress_password=_____ in command line.');
        }
        
        cy.visit('/');

        cy.contains('Sign In').click();

        cy.get('[name=username]')
        .type(username)
        .should('have.value', username);

        cy.get('[name=password]')
        .type(password, { log: false });

        cy.get('button[type=submit]').click();

        cy.contains(`Hi, ${username}`);
        cy.contains('To Do');
        cy.contains('Rewards');
    });
});