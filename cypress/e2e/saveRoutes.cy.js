describe('Navigate to User Overview', () => {
    it('Navigate to /unauthorized', () => {

        // visit the login page
        cy.visit('http://localhost:3000/login')

        // log in with normal user to the application
        cy.get('#email')
            .type('user@example.com')
        cy.get('#password')
            .type('1234')
        cy.get('form').submit()
            cy.wait(500)

        //navigate to /users/all
        cy.visit("http://localhost:3000/users/all")

        //should get navigated to /unauthorized
        cy.url().should('include', '/unauthorized')

    })

    it('Show all Users', () => {
        // visit the login page
        cy.visit('http://localhost:3000/login')

        // log in with admin to the application
        cy.get('#email')
            .type('admin@example.com')
        cy.get('#password')
            .type('1234')
        cy.get('form').submit()
        cy.wait(500)

        //navigate to /users/all
        cy.visit("http://localhost:3000/users/all")

        //should get navigated to /users/all and see user
        cy.url().should('include', '/users/all')
        cy.get("#userTable").should("be.visible")
    })
})