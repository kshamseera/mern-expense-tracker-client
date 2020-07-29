import React,{useState} from 'react'
import Expense from './Expense'
// import DatePicker from 'react-date-picker'
import {useGlobalState} from '../config/store'
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button';
import DateFnsUtils from '@date-io/date-fns';
import {MuiPickersUtilsProvider, DatePicker,} from '@material-ui/pickers';

const useStyles = makeStyles(theme => ({
    root: {
      width: '90%',
      maxWidth: '800px',
      margin: 'auto',
      marginTop: 40,
      marginBottom: 40
    },
    search:{
      display: 'flex',
      justifyContent: 'flex-end',
      alignItems: 'center'
    },
    textField: {
      margin:'8px 16px',
      width:230,
      fontcolor:"black"
    },
    error: {
        verticalAlign: 'middle',
        color: 'red'
      },
  }))

const ExpenseList = () => {
    const classes = useStyles()
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
        //filtering dates 
        const filteredExpenses = expenses.filter(function(expense) {
            const expenseDate = new Date(expense.date) //change date to object
            return (expenseDate >= formDate.fromDate && expenseDate <= formDate.toDate )
            })
        setDisplayExpenses(filteredExpenses)
        if(filteredExpenses.length === 0){
            setMessage("* Sorry!! There Are No Records Available.")
        }
        else{
            setMessage(null)
        }
    }

    return (
      <div data-cy="expenses" className={classes.root}>
         <div className={classes.search}>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <DatePicker
            format="dd/MM/yyyy"
            label=" Records From"
            className={classes.textField}
            views={["year", "month", "date"]}
            value={formDate.fromDate}
            onChange={handleFromDateChange}
            showTodayButton

         />
        <DatePicker
            format="dd/MM/yyyy"
            label=" Records To"
            className={classes.textField}
            views={["year", "month", "date"]}
            value={formDate.toDate}
            onChange={handleToDateChange} 
            showTodayButton
         />
        </MuiPickersUtilsProvider>
        <Button variant="contained" color="primary" onClick ={handleSubmit} >
           Search
        </Button>
       </div>
        <div>
        <Typography component="p" color="error">{message && <p>{message}</p>}</Typography>
            {displayExpenses.sort((a,b) => b.date - a.date).map((expense) => <Expense key={expense._id} expense={expense} />)} 
        </div>
      </div>
                /* <form style ={formStyle} onSubmit ={handleSubmit}>
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
                </form> */
            
     
    )
}

export default ExpenseList