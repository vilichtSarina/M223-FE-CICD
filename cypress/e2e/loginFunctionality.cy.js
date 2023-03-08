describe('Login Functionality', () => {
    it('Should log in successfully with valid credentials', () => {
        // visit the login page
        cy.visit('http://localhost:3000/login')

        // fill in the email and password fields
        cy.get('#email')
            .type('admin@example.com')
        cy.get('#password')
            .type('1234')

        // submit the form
        cy.get('form').submit()

        // assert that the user is redirected to the dashboard page
        cy.url().should('include', '/home')
    })

    it('Should show an error message with invalid credentials', () => {
        // visit the login page
        cy.visit('http://localhost:3000/login')

        // fill in the email and password fields with invalid credentials
        cy.get('#email')
            .type('invaliduser@example.com')
        cy.get('#password')
            .type('invalidpassword')

        // submit the form
        cy.get('form').submit()

        // assert that the user stays on the login page and sees an error message
        cy.url().should('include', '/login')
        cy.get('.swal2-popup').should('be.visible')

    })
})