
import React, {useEffect, useReducer} from 'react'
import {BrowserRouter, Switch, Route} from 'react-router-dom'
import Home from './components/Home'
import Nav from './components/Nav'
import NewExpense from './components/NewExpense'
import EditExpense from './components/EditExpense'
import Expense from './components/Expense'
import expenseData from './data/expense_data'
import ExpenseList from './components/ExpenseList'
import Register from './components/Register'
import SignIn from './components/SignIn'
import stateReducer from './config/stateReducer'
import {StateContext} from './config/store'

const App = () => {

  // initial state for state reducer
  const initialState = {
    expenseList: [],
    loggedInUser: null
  }

  // creates state reducer store and dispatcher
  const [store, dispatch] = useReducer(stateReducer,initialState)
  
  useEffect(() => {
    dispatch({
      type: "setExpenseList",
      data: expenseData
    })
  },[])

  return (
    <div >
      <StateContext.Provider value={{store,dispatch}} >
        <BrowserRouter>
          <Nav />
          <Home />
          <Switch>
            <Route exact path="/" component={ExpenseList} />
            <Route exact path="/expenses/:id" component={Expense} />
            <Route exact path="/expenses/new" component={NewExpense} />
            <Route exact path="/expenses" component={ExpenseList} />
            <Route exact path="/expenses/edit/:id" component={EditExpense}/> 
            <Route exact path="/auth/login" component={SignIn} />
            <Route exact path="/auth/register" component={Register} />
          </Switch>
        </BrowserRouter>
      </StateContext.Provider>   
    </div>
  )
}

export default App
