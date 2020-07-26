let fixtures = {}

beforeEach(() => {
    //set viewport for desktop size
    cy.viewport(1024, 768)
    // start tests from root page
    cy.visit("/")
    // log out any current users
    cy.get('[data-cy=navbar]').then((navbar)=> {
		if(navbar.find('[data-cy=logout]').length > 0) {
			cy.get('[data-cy=logout').click()
		}
	})
    cy.fixture('registeredUser.json').then((user) => {
        fixtures.registeredUser = user
        cy.get('[data-cy=signIn]').click()
        cy.get('[data-cy=username]').type(fixtures.registeredUser.username)
        cy.get('[data-cy=password]').type(fixtures.registeredUser.password)
        cy.get('[data-cy=loginButton]').click()
        cy.get('[data-cy=addExpense]').click()
        cy.url().should('include', 'expenses/new')
    
    })
    cy.fixture('newExpense.json').then((newExpense) => {
        fixtures.newExpense = newExpense
    })
})