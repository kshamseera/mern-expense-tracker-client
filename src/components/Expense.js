import React from 'react'
import {Link} from 'react-router-dom'
import {useGlobalState} from '../config/store'
import {deleteExpense} from '../services/expenseServices'

const Expense = ({history, expense, showControls}) => {

    const {store, dispatch} = useGlobalState()
    const {expenses, loggedInUser} = store
    // where no expenses exist, return null
    if (!expense) return null

    const {item, amount, date, category, notes} = expense
    const allowEditDelete = loggedInUser && loggedInUser === expense.username
    const linkStyles = {
        textDecoration: "none",
        color:'black'
    }
   //Handle delete button
    function handleDelete(event) {
        event.preventDefault()
        deleteExpense(expense._id).then(() => {
            console.log("deleted expense")
            const updatedExpenses = expenses.filter((exp) => exp._id !== expense._id)
            dispatch ({
                type: "setExpenses",
                data: updatedExpenses
            })
            history.push("/")
        }).catch((error) => {
            console.log("error deleting expense", error)
        })
    }
    
    // handle edit in update button
    function handleEdit(event){
        event.preventDefault()
        history.push(`/expenses/edit/${expense._id}`)
    }

    return (
        <div>
        <Link style={linkStyles} to={`/expenses/${expense._id}`}>
            <h1>{item}</h1>
        </Link>
            <p>${amount}</p>
            <p>{new Date(date).toLocaleDateString()}</p>
            <p>{category}</p>
            <p>{notes}</p>
            {showControls && allowEditDelete && (
                <div>
                <button onClick={handleDelete}>Delete</button>
                <button onClick={handleEdit}>Edit</button>
                </div>
            )}
        </div>
    )
}

export default Expense