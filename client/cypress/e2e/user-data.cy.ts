describe('user data tests', () => {
    const username = Cypress.env('username');
    const password = Cypress.env('password');

    let userData;

    beforeEach(() => {
        cy.task('db:initialize', {username, password}).then(data => {
            userData = data;
            cy.log('Successfully initialized database');
        });
    });

    it('should fetch and display todos, rewards, and requirements', () => {
        const todos = userData[0];
        const rewards = userData[1];

        cy.login(username, password);

        // Todos
        cy.get(`[data-testid="todo-${todos[0].todoId}"]`).within(() => {
            cy.get('[name="text"]').should('have.value', todos[0].text);
        });

        cy.get(`[data-testid="todo-${todos[1].todoId}"]`).within(() => {
            cy.get('[name="text"]').should('have.value', todos[1].text);
        });


        // Rewards
        cy.get(`[data-testid="reward-${rewards[0].rewardId}"]`).within(() => {
            cy.get('[name="text"]').should('have.value', rewards[0].text);
        });

        cy.get(`[data-testid="reward-${rewards[1].rewardId}"]`).within(() => {
            cy.get('[name="text"]').should('have.value', rewards[1].text);
        });


        // Requirements
        cy.get(`[data-testid="reward-${rewards[0].rewardId}"]`).within(() => {
            cy.get('.requirements-list').within(() => {
                cy.contains('Todo 1');
                cy.contains('Todo 2').should('not.exist');
            });
        });

        cy.get(`[data-testid="reward-${rewards[1].rewardId}"]`).within(() => {
            cy.get('.requirements-list').within(() => {
                cy.contains('Todo 1').should('not.exist');
                cy.contains('Todo 2');
            });
        });
    });
});
