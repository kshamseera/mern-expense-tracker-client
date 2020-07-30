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
    // start all tests from main page
    cy.fixture('registeredUser.json').then((user) => {
        fixtures.registeredUser = user
        cy.get('[data-cy=signIn]').click()
        cy.get('[data-cy=username]').type(fixtures.registeredUser.username)
        cy.get('[data-cy=password]').type(fixtures.registeredUser.password)
        cy.get('[data-cy=signInButton]').click()
        cy.get('[data-cy=addExpense]').click()
        cy.url().should('include', 'expenses/new')
    })
    cy.fixture("editExpense.json").then(expense => {
		fixtures.editExpense = expense
		deleteExpense(expense)
	})
	cy.fixture("newExpense.json").then(expense => {
		fixtures.newExpense = expense
		// If the test post already exists, delete it
		deleteExpense(expense)
	})
})

function deleteExpense(expense) {
	// If the post exists, delete it
	cy.get("[data-cy=home]").click()
	cy.root().then(root => {
		if (root.find(expense.title).length > 0) {
			cy.contains(expense.title).click({force: true})
			cy.get("[data-cy=deleteButton]").click()
		}
	})
}

describe("Add an expense", () => {
	it("should display add expense form", () => {
		cy.get("[data-cy=addExpense]").click()
		cy.get("[data-cy=addExpenseForm]").should("be.visible")
	})
	it("should add and delete an expense", () => {
		cy.get("[data-cy=addExpense]").click()
		cy.get("[data-cy=addExpenseForm]").click()
		cy.get("[data-cy=inputItem]").type(fixtures.newExpense.item)
        cy.get("[data-cy=inputCategory]").type(fixtures.newExpense.category)
        cy.get("[data-cy=inputAmount]").type(fixtures.newExpense.amount)
		cy.get("[data-cy=inputNotes]").type(fixtures.newExpense.notes)
		cy.get("[data-cy=addExpenseButton]").click()
        // Verify new expense was added
        cy.get("[data-cy=allExpenses").click()
        cy.contains(fixtures.newExpense.item)
		// If the expense exists, delete it
		cy.contains(fixtures.newExpense.item).then(newExpense => {
			newExpense.click()
			cy.get("[data-cy=deleteButton").first().click('bottom')
		// Verify that the expense was deleted
        cy.should("not.contain", fixtures.newExpense.item)
        })
    })
describe("Edit an expense", () => {
    it("should display edit blog post form", () => {
        // First create an expense to edit
        cy.get("[data-cy=addExpense").click()
        cy.get("[data-cy=addExpenseForm").click()
        cy.get("[data-cy=inputItem]").type(fixtures.editExpense.item)
        cy.get("[data-cy=inputCategory]").type(fixtures.editExpense.category)
        cy.get("[data-cy=inputAmount]").type(fixtures.editExpense.amount)
        cy.get("[data-cy=inputNotes]").type(fixtures.editExpense.notes)
        cy.get("[data-cy=addExpenseButton").click()
        cy.root().contains('See More').click({ force: true })
        // See if we can show the edit expense form
        cy.contains(fixtures.editExpense.item).click({ force: true })
        cy.get("[data-cy=editButton").first().click()
        cy.get("[data-cy=editExpenseForm]").should("be.visible")
        cy.get("[data-cy=updateExpenseButton").click()
        // delete the expense
        deleteExpense(fixtures.editExpense)
        })
    })
})