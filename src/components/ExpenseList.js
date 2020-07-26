import React from 'react'
import Expense from './Expense'
import {useGlobalState} from '../config/store'

const ExpenseList = () => {
    const {store} = useGlobalState()
    const {expenses} = store
    
    return (
        <div data-cy="expenses">
           {expenses.sort((a,b) => b.date - a.date).map((expense) => <Expense key={expense._id} expense={expense} />)} 
        </div>
    )
}

export default ExpenseList