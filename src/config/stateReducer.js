export default function (state, action) {
    switch(action.type) {
        case "setLoggedInUser": {
            return {
                ...state,
                loggedInUser: action.data
            }
        }
        case "setExpenses": {
            return {
                ...state,
                expenses: action.data
            }
        }
        case "setExpenseOverview": {
            return {
                ...state,
                expenseOverview: action.data
            }
        }
        case "setError": {
            return {
                ...state,
                error: action.data
            }
        }
        default: 
            return state
    }
}