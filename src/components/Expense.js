import React from 'react'
import {Link} from 'react-router-dom'

const Expense = ({history, expense, showControls, deleteExpense}) => {
    // where no expenses exist, return null
    if (!expense) return null

    const {item, amount, date, category, notes} = expense

    function handleDelete(event) {
        event.preventDefault()
        deleteExpense(expense._id)
        history.push("/")
    }
    
    // handle edit in update button
    function handleEdit(event){
        event.preventDefault()
        history.push(`/expenses/edit/${expense._id}`)
    }

    return (
        <div>
        <Link to={`/expenses/${expense._id}`}>
            <h1>{item}</h1>
        </Link>
            <p>${amount}</p>
            <p>{date.toLocaleDateString()}</p>
            <p>{category}</p>
            <p>{notes}</p>
            {showControls && (
                <div>
                <button onClick={handleDelete}>Delete</button>
                <button onClick={handleEdit}>Edit</button>
                </div>
            )}
       
        </div>
    )
}

export default Expense