import React, { useState, useEffect } from 'react';
import {useGlobalState} from '../config/store'
import { getExpenseFromId,updateExpense } from '../services/expenseServices';
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import { grey } from '@material-ui/core/colors'
import DateFnsUtils from '@date-io/date-fns';
import {MuiPickersUtilsProvider, DatePicker,} from '@material-ui/pickers';

const useStyles = makeStyles(theme => ({
    card: {
      maxWidth: 600,
      margin: 'auto',
      textAlign: 'center',
      marginTop: theme.spacing(5),
      paddingBottom: theme.spacing(2),
      backgroundColor: "#E8EAF6"
    },
    error: {
      verticalAlign: 'middle'
    },
    title: {
      marginTop: theme.spacing(2),
      color: theme.palette.openTitle,
      fontSize:"24px",
      fontWeight:"bold",
      textTransform:"uppercase",
      fontFamily: "Roboto"
    },
    textField: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
      width: 300
    },
    label: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
      fontSize: '2em',
      color: grey,
      width: 300
    },
    submit: {
      margin: 'auto',
      marginBottom: theme.spacing(2)
    },
    input: {
      display: 'none'
    },
    filename:{
      marginLeft:'10px'
    }
  }))

const EditExpense = ({history, match}) => {
    const classes = useStyles()
    const {store, dispatch} = useGlobalState()
    const {expenses} = store
    const expenseId = match && match.params ? match.params.id : -1
    const expense = getExpenseFromId(expenses, expenseId)

    // Set initial form values to what is in the current expense
    const initialFormState = {
        item: "",
        category: "",
        amount: "",
        date: new Date(),
        notes: ""
    }
    const[formState, setFormState] = useState(initialFormState)

    useEffect(() => {
        // Set the formState to the fields in the expense after mount and when expense changes
      expense && setFormState ({
        item: expense.item,
        category: expense.category ,
        amount: expense.amount,
        date: new Date(expense.date),
        notes: expense.notes 
      })
    },[expense])

    function handleChange(event) {
        const name = event.target.name
        const value = event.target.value
        setFormState({
            ...formState,
            [name]:value 
        })
    }
    function handleDateChange(date) {
        setFormState({
            ...formState,
            date: date
        })
    }
    function handleSubmit (event) {
        event.preventDefault()
        const changeExpense = {
            _id: expense._id,
            username: expense.username,
            item: formState.item,
            category: formState.category,
            amount: formState.amount,
            date: formState.date,
            notes: formState.notes
        }
        updateExpense(changeExpense).then(() => {
            const otherExpense = expenses.filter((expense) => expense._id !== changeExpense._id)
            dispatch({
                type: "setExpenses",
                data: [changeExpense, ...otherExpense]
            })
            history.push(`/expenses/all`)
        }).catch((error) => {
            console.log("caught error on edit", error)
        })
        
    }

    return ( 
        <>
      <Card className={classes.card}>
        <CardContent>
          <Typography type="headline" component="h2" className={classes.title}>
            Update Expense
          </Typography>
          <br/>
          <TextField 
            id="item"
            name="item" 
            label="Item" 
            className={classes.textField} 
            value={formState.item} 
            onChange={handleChange}
            margin="normal"/><br/>
          <TextField 
            id="category" 
            name="category"
            label="Category"
            value={formState.category} 
            className={classes.textField} 
            onChange={handleChange} 
            margin="normal"/><br/>
          <TextField 
            id="amount" 
            name="amount"
            label="Amount ($)" 
            value={formState.amount} 
            className={classes.textField} 
            onChange={handleChange} 
            margin="normal" 
            type="number"/>
          <br/>
          <br/>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <DatePicker
            format="dd/MM/yyyy"
            label="Date"
            className={classes.textField}
            views={["year", "month", "date"]}
            value = {formState.date}
            name ="date"
            onChange = {handleDateChange}
            showTodayButton
         />
         </MuiPickersUtilsProvider>
          <br/>
          <br/>
          <TextField
            id="description"
            name="description"
            label="Description"
            value={formState.notes}
            multiline
            rows="2"
            onChange={handleChange}
            className={classes.textField}
            margin="normal"
          />
         <br/>
         <br/>
        </CardContent>
        <CardActions>
          <Button 
            color="primary" 
            variant="contained" 
            onClick={handleSubmit} 
            className={classes.submit}>Update
          </Button>
          <Button onClick={() => history.push("/expenses/all")} className={classes.submit} variant="contained">Cancel</Button>
        </CardActions>
      </Card>
    </>
     );
}
 
export default EditExpense;