function stateReducer(state, action) {
	switch(action.type) {
		case "setLoggedInUser":
			return {
				...state,
				loggedInUser: action.data
			}
		case "setExpenseList":
			return {
				...state,
				expenseList: action.data
			}
		case "addExpense":
			return {
				...state,
				expenseList: [action.data,...state.expenseList]
			}
		case "updateExpense":
            const otherExpenses = state.expenseList.filter((expense) => expense._id !== action.data._id)
            return{
                ...state,
                expenseList: [otherExpenses, action.data]
            }
        case "deleteExpense":
            const updatedExpenseList = state.expenseList.filter((expense) => expense._id !== parseInt(action.data))
        return {
            ...state,
            expenseList: updatedExpenseList
        }
		default:
			return state
	}
}
export default stateReducer