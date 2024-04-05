describe('todos tests', () => {
    const username = Cypress.env('username');
    const password = Cypress.env('password');

    beforeEach(() => {
        cy.fixture('response-data').then(responseData => {
            const { data } = responseData;
            const todos = data[0];
            cy.wrap(todos).as('todos');

            cy.intercept('GET', '/api/user-data', data)
            cy.login(username, password);
        })
    });

    it('should display todos', () => {
        cy.get('@todos').then(todos => {
            cy.get('#todo-edit-form-1 > .todo-edit-form-textfield').should('have.value', (todos[0] as any).text);
            cy.get('#todo-edit-form-2 > .todo-edit-form-textfield').should('have.value', (todos[1] as any).text);
        });
    });

    it('should have the first todo checked completed and the second todo not completed', () => {
        cy.get('[data-testid="todo-1"] > .toggle-button-container > .toggle-button').find('[data-testid="check"]').should('exist');
        cy.get('[data-testid="todo-2"] > .toggle-button-container > .toggle-button').find('[data-testid="check"]').should('not.exist');
    });
});