describe('Like Post', () => {
    it('Create Users', () => {

        // visit the login page
        cy.visit('http://localhost:3000/login')

        // log in with admin user to the application
        cy.get('#email')
            .type('admin@example.com')
        cy.get('#password')
            .type('1234')
        cy.get('form').submit()


        cy.visit("http://localhost:3000/useredit/")

        cy.get("#firstName").type("User1")
        cy.get("#email").type("user1@example.com")
        cy.get("#lastName").type("User1")
        cy.get("#submit").click()
        cy.visit("http://localhost:3000/useredit/")

        cy.get("#firstName").type("User2")
        cy.get("#email").type("user2@example.com")
        cy.get("#lastName").type("User2")
        cy.get("#submit").click()
        cy.visit("http://localhost:3000/useredit")

        cy.get("#firstName").type("User3")
        cy.get("#email").type("user3@example.com")
        cy.get("#lastName").type("User3")
        cy.get("#submit").click()
        cy.visit("http://localhost:3000/useredit/")

        cy.get("#firstName").type("User4")
        cy.get("#email").type("user4@example.com")
        cy.get("#lastName").type("User4")
        cy.get("#submit").click()
    })

    it('Like Post', () => {

        // visit the login page
        cy.visit('http://localhost:3000/login')


        cy.get('#email')
            .type('user1@example.com')
        cy.get('#password')
            .type('User1User1')
        cy.get('form').submit()

        cy.get("#button").click()


        // visit the login page
        cy.visit('http://localhost:3000/login')


        cy.get('#email')
            .type('user2@example.com')
        cy.get('#password')
            .type('User2User2')
        cy.get('form').submit()

        cy.get("#button").click()

        // visit the login page
        cy.visit('http://localhost:3000/login')


        cy.get('#email')
            .type('user3@example.com')
        cy.get('#password')
            .type('User3User3')
        cy.get('form').submit()

        cy.get("#button").click()

        // visit the login page
        cy.visit('http://localhost:3000/login')


        cy.get('#email')
            .type('user4@example.com')
        cy.get('#password')
            .type('User4User4')
        cy.get('form').submit()

        cy.get("#button").click()

    })
})