import React, {useState, useEffect } from 'react'
import {BrowserRouter, Route } from 'react-router-dom'
import Expenses from './components/ExpenseList'
import expenseData from './data/expense_data'
import ExpenseList from './components/ExpenseList'


const App = () => {
  const [expenses, setExpenses] = useState([])

  useEffect(() => {
    setExpenses(expenseData)
  }, [])

// return a single expense instance via id
function getExpenseFromId(id) {
  const expense = expenses.find((expense) => expense._id === parseInt(id))
  return expense
}

// delete a single expense instance via id
function deleteExpense(id) {
  const updatedExpenses = expenses.filter((expense) => expense._id !== parseInt(id))
  setExpenses(updatedExpenses)
}

  return (
    <div >
      <BrowserRouter>
          <h1>Expense Tracking App</h1>
          <switch>
          <Route exact path="/" render={(props) => <Expenses {...props} expenseData={expenses} /> } />
          <Route exact path="/expenses/:id" render={(props) => <ExpenseList {...props} expense={getExpenseFromId(props.match.params.id)} showControls deleteExpense={deleteExpense} /> } />
          </switch>
      </BrowserRouter>
    </div>
  )
}

export default App
