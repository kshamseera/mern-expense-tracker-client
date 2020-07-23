import React, { useState } from 'react'
import DatePicker from 'react-date-picker'
import {useGlobalState} from '../config/store'
import {addExpense} from '../services/expenseServices'

const NewExpense = ({history}) => {
    console.log("New expense")
    const formStyle= {
        maxWidth : "500px",
        margin: "2rem auto",
        border: "2px solid black",
        padding: "2rem",
        fontFamily: "sanSerif",
        backgroundColor: "white",
        // position: "relative",
        // left:"50%",
        // top:"50%",
        transform: "translate(-50% -50%)",
        // width: "400px",
        // height:"500px",
        // padding: "80px 40px
    }
    const labelStyle ={
        display:"block",
        padding:"1rem 0 .5rem 0",
        fontSize:"22px",
        color:"brown"
    }

    const inputStyle ={
        display: "block",
        width: "100%",
        // border: "2px solid #298089",
        border:"none",
        padding:".5rem",
        fontSize: "18px",
        borderRadius: "5px",
        // background: "transparent",
        borderBottom:"1px solid #fff",
        // outline:"none"

    }
    const buttonStyle ={
        display: "block",
        border:"0",
        width:"auto",
        borderRadius: "5px",
        background: "#343050",
        fontSize: "20px",
        padding: ".5rem",
        color: "white",
        margin:".5rem 0",
        cursor: "pointer",
        outline:"none"
    }

    function handleChange(event) {
        // console.log("event" , event)
        const name = event.target.name
        const value = event.target.value
        setFormState({
            ...formState,
             [name]:value 
        })
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
        const newExpense = {
            item: formState.item,
            category: formState.category,
            amount: formState.amount,
            date: formState.date,
            notes: formState.notes
        }
        addExpense(newExpense).then((newExpense) => {
            dispatch({
                type: "setExpenses",
                data: [newExpense,...expenses]
            })
            history.push(`/expenses/${newExpense._id}`)
        }).catch ((error) => {
            console.log("Caught an error on server adding a expense", error)
        })

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
    const {expenses} = store
   
    return ( 
        <>
        <form style = {formStyle} onSubmit = {handleSubmit}>
            <div>
                <h2>Add Expense</h2>
            </div>
            <div>
               <label style ={labelStyle}>Item Name</label>
               <input style = {inputStyle} type ="text"  required name="item"  value={formState.item} onChange = {handleChange} />
            </div>
            <div>
               <label style = {labelStyle}>Category</label>
               <input style = {inputStyle}  type ="text"  required name="category"  value={formState.category} onChange = {handleChange} />
            </div>
            <div>
               <label style = {labelStyle}>Amount</label>
               <input style = {inputStyle}  type ="text"  required name="amount" placeholder ="$" value={formState.amount} onChange = {handleChange} />
            </div>
            <div>
               <label style = {labelStyle} >Date</label>
               <DatePicker 
                  dateFormat = {["year", "month", "date"]}
                  value = {formState.date}
                  name ="date"
                  onChange = {handleDateChange}
                  style = {inputStyle} 
               />
               {/* <input type ="text"  required name="date"  value= {formState.date} onChange = {handleChange}/> */}
            </div>
            <div>
               <label style = {labelStyle} >Description</label>
               <input style = {inputStyle}  type ="text" name="notes"  value={formState.notes} onChange = {handleChange} />
            </div>
            <div>
            <button style = {buttonStyle}  type ="submit" >Add Expense</button>
            </div>
        </form>

        </>
     );
}
 
export default NewExpense;