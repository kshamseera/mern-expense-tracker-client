
import React, {useReducer,useEffect} from 'react'
import {BrowserRouter, Switch, Route} from 'react-router-dom'
import Home from './components/Home'
import Nav from './components/Nav'
import NewExpense from './components/NewExpense'
import EditExpense from './components/EditExpense'
import Expense from './components/Expense'
import ExpenseList from './components/ExpenseList'
import SignIn from './components/SignIn'
import Register from './components/Register'
import stateReducer from './config/stateReducer'
import {stateContext} from './config/store'
import {getExpenseFromId,fetchExpenses} from './services/expenseServices'
import {getAuthenticatedUser} from './services/authServices'


const App = () => {

  const initialState = {
	  loggedInUser: null,
	  expenses: []
  }


 // Create state reducer store and dispatcher
  const [store, dispatch] = useReducer(stateReducer, initialState) 
  const {expenses} =store

  useEffect(() => {
    fetchExpenses(dispatch)
  },[])

  useEffect(() => {
    getAuthenticatedUser().then((username) => {
      if(username) {
        dispatch({
          type: "setLoggedInUser",
          data: username
        })
      }
    })
  },[])

  return (
    <div >
    <stateContext.Provider value ={{store, dispatch}}>
      <BrowserRouter>
        <Nav />
        <Home />
      <Switch>
        <Route exact path="/expenses/all"  component= {ExpenseList} />
        <Route exact path = "/expenses/new" component= {NewExpense} />
        <Route exact path="/expenses/:id" render={(props) => <Expense {...props} expense={getExpenseFromId(expenses,props.match.params.id)} showControls /> }/>
        <Route exact path ="/expenses/edit/:id" component= {EditExpense} /> 
        <Route exact path="/auth/login" component={ SignIn} />
        <Route exact path="/auth/register" component={Register} />
      </Switch>
      </BrowserRouter>  
      </stateContext.Provider> 
    </div>
  )
}

export default App
