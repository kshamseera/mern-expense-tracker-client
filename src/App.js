import React, {useState,useEffect} from 'react'
import {BrowserRouter, Switch, Route} from 'react-router-dom'
import Home from './components/Home'
import NewExpense from './components/NewExpense'
import EditExpense from './components/EditExpense'
import Expenses from './components/ExpenseList'
import expenseData from './data/expense_data'
import ExpenseList from './components/ExpenseList'

const App = () => {

  const [expenses, setExpenses] = useState([])

  useEffect(() => {
    setExpenses(expenseData)
  }, [])

  //generating new ids for the new expense
  function getNextId() {
    const ids = expenses.map((expense) => expense._id)
    return ids.sort()[ids.length-1]+1
  }

  //get expenseById
  function getExpenseFromId(id) {
    return expenses.find((expense) => expense._id === parseInt(id))
  }

  //add new expense
  function addExpense(expense) {
    setExpenses([expense,...expenses])
  }

  //update expense
  function updateExpense(changeExpense) {
    const updatedExpense = expenses.filter((expense) => expense._id !== parseInt(changeExpense._id))
    setExpenses([...updatedExpense, changeExpense])
  }

  // delete a single expense instance via id
  function deleteExpense(id) {
    const updatedExpenses = expenses.filter((expense) => expense._id !== parseInt(id))
    setExpenses(updatedExpenses)
  }

  return (
    <div >
      <BrowserRouter>
        <Home />
      <Switch>
        <Route exact path="/" render={(props) => <Expenses {...props} expenseData={expenses} /> } />
        <Route exact path = "/expenses/new" render={(props) => <NewExpense {...props} addExpense={addExpense} nextId= {getNextId()} /> } />
        <Route exact path="/expenses/:id" render={(props) => <ExpenseList {...props} expense={getExpenseFromId(props.match.params.id)} showControls deleteExpense={deleteExpense} /> } />
       <Route exact path ="/expenses/edit/:id" render={(props) => <EditExpense {...props} expense={getExpenseFromId(props.match.params.id)} updateExpense={updateExpense}/> }/> 
      </Switch>
      </BrowserRouter>   
    </div>
  )
}

export default App
