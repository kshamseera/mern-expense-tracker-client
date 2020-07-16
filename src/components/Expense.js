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

    return (
        <div>
        <Link to={`/expenses/${expense._id}`}>
            <h1>{item}</h1>
            <p>${amount}</p>
            <p>{date.toLocaleString()}</p>
            <p>{category}</p>
            <p>{notes}</p>
            {showControls && (
                <button onClick={handleDelete}>Delete</button>
            )}
        </Link>
        </div>
    )
}

export default Expense