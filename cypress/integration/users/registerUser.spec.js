let fixtures = {}

beforeEach(() => {
	// Set the viewport
	cy.viewport(1024, 768)
	// Start tests from home page
	cy.visit("/")
	cy.fixture("unregisteredUser.json").then(user => {
		fixtures.newUser = user
	})
})

describe("Register user", () => {
	it("should route to /auth/register", () => {
		cy.get("[data-cy=signUp]").click()
		cy.url().should("include", "/auth/register")
	})
	it("should register a user", () => {
		cy.get("[data-cy=signUp]").click()
		cy.get("[data-cy=username]").type(fixtures.newUser.username)
		cy.get("[data-cy=email]").type(fixtures.newUser.email)
		cy.get("[data-cy=password]").type(fixtures.newUser.password)
		cy.get("[data-cy=registerButton]").click()
		cy.get('[data-cy=navLoggedIn').find("[data-cy=logout]")
	})
})
