import React, { useState } from 'react'
import {Link} from 'react-router-dom'
import DatePicker from 'react-date-picker'
import {useGlobalState} from '../config/store'
import {addExpense} from '../services/expenseServices'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import { grey } from '@material-ui/core/colors'

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
      fontSize: '1em'
    },
    textField: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
      width: 300
    },
    label: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
      fontSize: '1.07em',
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

const NewExpense = ({history}) => {
    const initialFormState = {
        item: "",
        category: "",
        amount: "",
        date: new Date(),
        notes: ""
    }
    const[formState, setFormState] = useState(initialFormState)
    const {store, dispatch} = useGlobalState()
    const {expenses} = store
   
    const classes = useStyles()
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
            history.push('/')
        }).catch ((error) => {
            console.log("Caught an error on server adding a expense", error)
        })
    }
    return ( 
        <div>
      <Card className={classes.card}>
        <CardContent>
          <Typography type="headline" component="h2" className={classes.title}>
            Add Expense
          </Typography>
          <br/>
          <TextField 
            id="item"
            name="item" 
            label="Item" 
            required 
            data-cy="inputItem" 
            className={classes.textField} 
            value={formState.item} 
            onChange={handleChange}
            margin="normal"/><br/>
          <TextField 
            id="category" 
            name="category"
            label="Category"
            data-cy="inputCategory" 
            required 
            className={classes.textField} 
            onChange={handleChange} 
            margin="normal"/><br/>
          <TextField 
            id="amount" 
            name="amount"
            label="Amount ($)" 
            required 
            data-cy="inputAmount" 
            className={classes.textField} 
            onChange={handleChange} 
            margin="normal" 
            type="number"/>
          <br/>
          <br/>
          <Typography className={classes.label}>
            Date *
          </Typography>
          <DatePicker
            dateFormat = {["year", "month", "date"]}
            value = {formState.date}
            name ="date"
            onChange = {handleDateChange}
            className={classes.textField}
            data-cy="datePicker" 
          />
          <br/>
          <br/>
          <TextField
            id="description"
            name="description"
            label="Description"
            multiline
            rows="2"
            onChange={handleChange}
            className={classes.textField}
            margin="normal"
            data-cy="inputNotes"
          />
          <br/>
          <br/>
        </CardContent>
        <CardActions>
          <Button 
            color="primary" 
            variant="contained" 
            onClick={handleSubmit} 
            className={classes.submit}>Submit
          </Button>
          <Link to='/' className={classes.submit}>
            <Button variant="contained">Cancel</Button>
          </Link>
        </CardActions>
      </Card>
    </div>
    )
}
 
export default NewExpense