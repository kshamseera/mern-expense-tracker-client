import React from 'react'
import Expense from './Expense'
import {useGlobalState} from '../config/store'

const ExpenseList = () => {
    const {store} = useGlobalState()
    const {expenseList} = store
    return (
        <div>
           {expenseList.sort((a,b) => b.date - a.date).map((expense) => <Expense key={expense._id} expense={expense} />)} 
        </div>
    )
}

export default ExpenseList