import api from '../config/api'

// Returns a single expense based on the id provided
export function getExpenseFromId(expenses,id) {
    const expense =  expenses.find((expense) =>  expense._id === id)
    return expense
}

// Returns all expenses from the server
export async function getAllExpenses() {
    const response = await api.get("/expenses")
    return response.data
}

// Adds a expense on the server
export async function addExpense(newExpense) {
    const response = await api.post("/expenses", newExpense)
    return response.data
}

// Deletes a expense on the server
export async function deleteExpense(id) {
    const response = await api.delete(`/expenses/${id}`)
    return response.data
}


export async function updateExpense(expense) {
    const response = await api.put(`/expenses/${expense._id}`, expense)
    return response.data
}

export function fetchExpenses(dispatch) {
    getAllExpenses().then((expenseData) => {
      dispatch({
        type: "setExpenses",
        data: expenseData
      })
     }).catch((error) => {
       dispatch ({
         type: "setError",
         data: true
       })
       console.log("An error occured fetching expenses from the server:", error)
     })
  }