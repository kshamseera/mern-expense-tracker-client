import React from 'react'
import Expense from './Expense'


const ExpenseList = ({expenseData}) => {
    // console.log("expenseData" ,expenseData)
    return (
        <div>
           {expenseData.sort((a,b) => b.date - a.date).map((expense) => <Expense key={expense._id} expense={expense} />)} 
        </div>
    )
}

export default ExpenseList