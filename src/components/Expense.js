import React from 'react'
import ExpansionPanel from '@material-ui/core/ExpansionPanel'
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary'
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Divider from '@material-ui/core/Divider'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import {useGlobalState} from '../config/store'
import {deleteExpense} from '../services/expenseServices'

const useStyles = makeStyles(theme => ({

    root: {
        width: '90%',
        maxWidth: '700px',
        margin: 'auto',
        marginTop: 40,
        marginBottom: 40
    },
    heading: {
      fontSize: '1.5em',
      fontWeight: theme.typography.fontWeightRegular,
      marginTop: 12,
      marginBottom: 4,
      textTransform:'capitalize'
    },
    info: {
        marginRight: 32,
        width: 90
    },
    panel: {
      border: '1px solid black',
      margin: 6
    },
    amount: {
      fontSize: '2em',
      color: '#2bbd7e',
    },
    date: {
        fontSize: '1.1em',
        color: 'black',
        marginTop: 4
    }
  }))

const Expense = ({history, expense, showControls}) => {
    const {item, amount, date, category, notes} = expense
    const {store, dispatch} = useGlobalState()
    const {expenses, loggedInUser} = store
    
    const classes = useStyles()

    // where no expenses exist, return null
    if (!expense) return null
    const allowEditDelete = loggedInUser && loggedInUser === expense.username
    
   //Handle delete button
    function handleDelete(event) {
        event.preventDefault()
        deleteExpense(expense._id).then(() => {
            console.log("deleted expense")
            const updatedExpenses = expenses.filter((exp) => exp._id !== expense._id)
            dispatch ({
                type: "setExpenses",
                data: updatedExpenses
            })
            history.push("/expenses/all")
        }).catch((error) => {
            console.log("error deleting expense", error)
        })
    }
    
    // handle edit in update button
    function handleEdit(event){
        event.preventDefault()
        history.push(`/expenses/edit/${expense._id}`)
    }

    return (
        <div className={classes.root}>
      
        <ExpansionPanel className={classes.panel} >
          <ExpansionPanelSummary
            expandIcon={<ExpandMoreIcon />}
          >
            <div className={classes.info}>
                <Typography className={classes.amount}>${amount}</Typography><Divider style={{marginTop: 4, marginBottom: 4}}/>
                <Typography className={classes.date}>{new Date(date).toLocaleDateString()}</Typography>  
            </div>
            <div>
                <Typography className={classes.heading}>{item}</Typography>
            </div>
          </ExpansionPanelSummary>
            <Divider />
          <ExpansionPanelDetails style={{display: 'block'}}>
            <Typography component="p" > Item: {item}</Typography>
            <Typography component="p"> Amount: ${amount}</Typography>
            <Typography component="p">Date: {new Date(date).toLocaleDateString()}</Typography>
            <Typography component="p">Category: {category}</Typography>
            <Typography component="p" >Description: {notes}</Typography> 
            {showControls && allowEditDelete && (
                <div>
                <button onClick={handleDelete} data-cy="deleteButton">Delete</button>
                <button onClick={handleEdit} data-cy="editButton">Edit</button>
                </div>
            )}
          </ExpansionPanelDetails>
        </ExpansionPanel>
        </div>
    )
}

export default Expense