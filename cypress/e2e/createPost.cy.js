describe('Create Post', () => {
    it('Should create a Post', () => {

        // visit the login page
        cy.visit('http://localhost:3000/login')

        // log in to the application
        cy.get('#email')
            .type('user@example.com')
        cy.get('#password')
            .type('1234')
        cy.get('form').submit()


        //add valid post
        cy.get("#image")
            .type("https://upload.wikimedia.org/wikipedia/commons/thumb/b/b1/Stephan%27s_Quintet_taken_by_James_Webb_Space_Telescope.jpg/220px-Stephan%27s_Quintet_taken_by_James_Webb_Space_Telescope.jpg")
        cy.get("#description")
            .type("Die Galaxien NGC 7317 bis NGC 7319 bilden ein räumlich enges, wechselwirkendes System.")
        cy.get("form").submit()

        //success message should be visible
        cy.get(".swal2-icon-success").should("be.visible")
    })

    it('Should fail to create a Post', () => {
        // visit the login page
        cy.visit('http://localhost:3000/login')

        // log in to the application
        cy.get('#email')
            .type('user@example.com')
        cy.get('#password')
            .type('1234')
        cy.get('form').submit()

        //add invalid post
        cy.get("#image")
            .type("https://upload.wikimedia.org/wikipedia/commons/thumb/b/b1/Stephan%27s_Quintet_taken_by_James_Webb_Space_Telescope.jpg/220px-Stephan%27s_Quintet_taken_by_James_Webb_Space_Telescope.jpg")
        cy.get("#description")
            .type("Die Galaxien NGC 7317 bis NGC 7319 bilden ein räumlich enges, wechselwirkendes System in etwa 300 Millionen Lichtjahren Entfernung. Aufgrund der gegenseitigen Gravitationswirkung sind die Spiralarme der Galaxien unregelmäßig verformt.")
        cy.get("form").submit()

        //success message should be visible
        cy.get(".errorMessage").should("be.visible")
    })
})