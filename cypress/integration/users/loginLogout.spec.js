let fixtures = {}

beforeEach(() => {
    //set viewport for desktop size
    cy.viewport(1024, 768)
    // start tests from root page
    cy.visit("/")
    cy.get('[data-cy=navbar]').then((navbar)=> {
        if(navbar.find('[data-cy=logout]').length > 0) {
          cy.get('[data-cy=logout').click()
        }
    })
    cy.fixture('registeredUser.json').then((user) => {
        fixtures.registeredUser = user
    })
})

describe('Test login', () => {
    it('Should go to the login page', () => {
        cy.get('[data-cy=signIn]').click()
        cy.url().should('include', 'auth/login')
    })
    it('Should render SignIn component', () => {
        cy.get('[data-cy=signIn]').click()
        cy.get('[data-cy=signInForm]')
            .should('be.visible')
    })
    it('can login', () => {
        cy.get('[data-cy=signIn]').click()
        cy.get('[data-cy=username]').type(fixtures.registeredUser.username)
        cy.get('[data-cy=password]').type(fixtures.registeredUser.password)
	    cy.get('[data-cy=signInButton]').click()
    })
})

describe('Test logout', () => {
    it('should logout user', () => {
        cy.get("[data-cy=signIn]").click()
		    cy.get("[data-cy=username]").type(fixtures.registeredUser.username)
		    cy.get("[data-cy=password]").type(fixtures.registeredUser.password)
		    cy.get("[data-cy=signInButton]").click()
		    cy.get('[data-cy=logout]').click()
        cy.get('[data-cy=signIn')
    })
})
