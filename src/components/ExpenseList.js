import React,{useState} from 'react'
import Expense from './Expense'
import DatePicker from 'react-date-picker'
import {useGlobalState} from '../config/store'

const ExpenseList = () => {
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
    const formStyle= {
        display: "flex",
        maxWidth : "500px",
        margin: "2rem auto",
        // border: "2px solid black",
        padding: "2rem",
        fontFamily: "sanSerif",
        backgroundColor: "white",
        transform: "translate(-50% -50%)",
        // width: "400px",
        // height:"500px",
        // padding: "80px 40px
    }

    const {store} = useGlobalState()
    const {expenses} = store

    const initialFormState = {
        fromDate: "",
        toDate: ""
    }

    const[formDate, setFormDate] = useState(initialFormState)
    const[displayExpenses,setDisplayExpenses] = useState(expenses)
    const[message,setMessage] = useState(null)

    function handleFromDateChange(date) {
        setFormDate({
            ...formDate,
            fromDate: date
        })
    }
    function handleToDateChange(date) {
        setFormDate({
            ...formDate,
            toDate: date
        })
    }
   
    function handleSubmit(event) {

        event.preventDefault()
        const filteredExpenses = expenses.filter(function(expense) {
            const expenseDate = new Date(expense.date) //change date to object
            // console.log(expenseDate)
            return (expenseDate >= formDate.fromDate && expenseDate <= formDate.toDate )
            })
        setDisplayExpenses(filteredExpenses)
        if(filteredExpenses.length === 0){
            setMessage("There are no record available")
        }
        else{
            setMessage(null)
        }
    }

    return (
        <div>
        <form style ={formStyle} onSubmit ={handleSubmit}>
        <label style = {labelStyle} >Records From</label>
               <DatePicker 
                  dateFormat = {["year", "month", "date"]}
                  name ="fromdate"
                  value={formDate.fromDate}
                  onChange = {handleFromDateChange}
                  style = {inputStyle} 
               />
        <label style = {labelStyle} >Records To</label>
            <DatePicker 
                dateFormat = {["year", "month", "date"]}
                name ="todate"
                value={formDate.toDate}
               onChange = {handleToDateChange}
                style = {inputStyle} 
            />  
            <input type ="submit" style ={buttonStyle} value ="Search" ></input>  
        </form>
    
        <div>
        {message && <p>{message}</p>}
           {displayExpenses.sort((a,b) => b.date - a.date).map((expense) => <Expense key={expense._id} expense={expense} />)} 
        </div>
        </div> 
    )
}

export default ExpenseList