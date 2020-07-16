import React, {useState} from 'react'
import {BrowserRouter, Switch, Route} from 'react-router-dom'
import Home from './components/Home'
import NewExpense from './components/NewExpense'
import EditExpense from './components/EditExpense'

const App = () => {

  const [expenses, setExpenses] = useState([])

  //generating new ids for the new expense
  function getNextId() {
    const ids = expenses.map((expense) => expense._id)
    return ids.sort()[ids.length-1]+1
  }

  //get expenseById
  function getExpenseFromId(id) {
    return expenses.find((expense) => expense._id === parseInt (id))
  }

  //add new expense
  function addExpense(expense) {
    setExpenses([...expenses, expense])
  }

  //update expense
  function updateExpense(updateExpense) {
    const updatedExpense = expenses.filter((expense) => expense._id !== parseInt(updateExpense._id))
    setExpenses([...updatedExpense, updateExpense])
  }


  return (
    <div >
      <BrowserRouter>
        <Home />
      <Switch>
        <Route exact path = "/expenses/new" render={(props) => <NewExpense {...props} addExpense={addExpense} nextId = {getNextId()} /> } />
        <Route exact path ="/expenses/edit/:id" render={(props) => <EditExpense {...props} expense={getExpenseFromId(props.match.params.id)} updateExpense={updateExpense}/> }/> 
      </Switch>
      </BrowserRouter>
    </div>
  )
}

export default App
