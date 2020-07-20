import React, {useState} from 'react'
import DatePicker from 'react-date-picker'
import {useGlobalState} from '../config/store'

const NewExpense = ({history}) => {
      //generating new ids for the new expense
    function getNextId() {
        const ids = expenseList.map((expense) => expense._id)
        return ids.sort()[ids.length-1]+1
    }

    function handleChange(event) {
        console.log("event" , event)
        const name = event.target.name
        const value = event.target.value
        setFormState({...formState, [name]:value })
    }

    function handleDateChange(date) {
        console.log(typeof date)
        setFormState({
            ...formState,
            date: date
        })
    }

    function handleSubmit (event) {
        event.preventDefault()
        const nextId = getNextId()
        const newExpense = {
            _id: nextId,
            item: formState.item,
            category: formState.category,
            amount: formState.amount,
            date: formState.date,
            notes: formState.notes
        }
        dispatch({
            type: "setExpenseList",
            data: [...expenseList, newExpense]
        })
        history.push(`/expenses/${nextId}`)
    }

    const initialFormState = {
        item: "",
        category: "",
        amount: "",
        date: "",
        notes: ""
    }

    const[formState, setFormState] = useState(initialFormState)
    const {store, dispatch} = useGlobalState()
    const {expenseList} = store

    return ( 
        <form onSubmit = {handleSubmit}>
            <div>
                <h2>Add Expense</h2>
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
               <input type ="text"  required name="amount" placeholder ="$" value={formState.amount} onChange = {handleChange} />
            </div>
            <div>
               <label>Date</label>
               <DatePicker 
                  dateFormat = {["year", "month", "date"]}
                  value = {formState.date}
                  name ="date"
                  onChange = {handleDateChange}/>
            </div>
            <div>
               <label>Description</label>
               <input type ="text" name="notes"  value={formState.notes} onChange = {handleChange} />
            </div>
            <div>
            <input type ="submit" value="Add Expense"></input>
            </div>
        </form>
     )
}
 
export default NewExpense