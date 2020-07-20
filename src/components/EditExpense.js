import React, { useState, useEffect } from 'react'
import {useGlobalState} from '../config/store'
import DatePicker from 'react-date-picker'

const EditExpense = ({history, expense}) => {

    const {store, dispatch} = useGlobalState()
    const {expenseList} = store

    function handleChange(event) {
        const name = event.target.name
        const value = event.target.value
        setFormState({...formState, [name]:value })
    }
    function handleDateChange(date) {
        setFormState({
            ...formState,
            date: date
        })
    }
    function handleSubmit (event) {
        event.preventDefault()
        const updatedExpense = {
            _id: expense._id,
            item: formState.item,
            category: formState.category,
            amount: formState.amount,
            date: formState.date,
            notes: formState.notes
        }
        const otherExpenses = expenseList.filter((expense) => expense._id !== updatedExpense._id)

        dispatch({
            type: "setExpenseList",
            data: [...otherExpenses, updatedExpense]
        })
        history.push(`/posts/${expense._id}`)
    }

    // pre-fills form with values of current expense
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
        item: expense.item,
        category: expense.category ,
        amount: expense.amount,
        date: expense.date,
        notes: expense.notes 
      })
    },[expense])
  
    return ( 
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
               <DatePicker 
                  dateFormat = {["year", "month", "date"]}
                  value = {formState.date}
                  name ="date"
                  onChange = {handleDateChange}/>
               {/* <input type ="text"  required name="date" value={formState.date} onChange = {handleChange} /> */}
            </div>
            <div>
               <label>Description</label>
               <input type ="text" name="notes"  value={formState.notes} onChange = {handleChange} />
            </div>
            <div>
            <input type ="submit" value="Update Expense"></input>
            </div>
        </form>
     )
}
 
export default EditExpense