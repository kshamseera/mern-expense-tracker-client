import React, { useState, useEffect } from 'react';

const EditExpense = ({history, expense, updateExpense, nextId}) => {

    const initialFormState = {
        item: "",
        category: "",
        amount: "",
        date: "",
        notes: ""
    }

    const[formState, setFormState] = useState(initialFormState)
    useEffect(() => {
      expense && setFormState ({
        item: formState.item,
        category: formState.category ,
        amount: formState.amount,
        date: formState.date ,
        notes: formState.notes 
      })
    },[expense])

    function handleChange(event) {
        const name = event.target.name
        const value = event.target.value
        setFormState({...formState, [name]:value })
    }

    function handleSubmit (event) {
        event.preventDefault()
        const updateExpense = {
            _id: nextId,
            item: formState.item,
            category: formState.category,
            amount: formState.amount,
            date: formState.date,
            notes: formState.notes
        }
        updateExpense(updateExpense)
        history.push('/')
    }

    return ( 
        <>
        <form onSubmit = {handleSubmit}>
            <div>
                <h2>Edit Expense</h2>
            </div>
            <div>
               <label>Item Name</label>
               <input type ="text"  required name="item"  value={formState.item} onChange = {handleChange} />
            </div>
            <div>
               <label>Category</label>
               <input type ="text"  required name="category"  value={formState.category} onChange = {handleChange} />
            </div>
            <div>
               <label>Amount</label>
               <input type ="text"  required name="amount"  value={formState.amount} onChange = {handleChange} />
            </div>
            <div>
               <label>Date</label>
               <input type ="text"  required name="date" value={formState.date} onChange = {handleChange} />
            </div>
            <div>
            <input type ="submit" value="Update Expense"></input>
            </div>
        </form>

        </>
     );
}
 
export default EditExpense;