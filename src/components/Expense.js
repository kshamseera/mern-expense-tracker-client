import React from 'react'
import {Link} from 'react-router-dom'
import ExpansionPanel from '@material-ui/core/ExpansionPanel'
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary'
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails'
import Edit from '@material-ui/icons/Edit'
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
      marginBottom: 4
    },
    info: {
        marginRight: 32,
        width: 90
    },
    notes: {
      color: 'grey'
    },
    panel: {
      border: '1px solid black',
      margin: 6
    },
    amount: {
      fontSize: '2em',
      color: '#2bbd7e',
    },
    textField: {
      margin:'8px 16px',
      width:240
    },
    date: {
        fontSize: '1.1em',
        color: '#8b8b8b',
        marginTop: 4
    }
  }))

const Expense = ({history, expense, showControls}) => {
    const classes = useStyles()
    const {store, dispatch} = useGlobalState()
    const {expenses, loggedInUser} = store
    // where no expenses exist, return null
    if (!expense) return null

    const {item, amount, date, category, notes} = expense
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
            history.push("/")
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
        <ExpansionPanel className={classes.panel}>
          <ExpansionPanelSummary
            expandIcon={<Edit />}
          >
            <div className={classes.info}>
                <Typography className={classes.amount}>${amount}</Typography><Divider style={{marginTop: 4, marginBottom: 4}}/>
                <Typography>
                    {category}
                </Typography>
                <Typography className={classes.date}>{new Date(date).toLocaleDateString()}</Typography>  
            </div>
            <div>
                <Typography className={classes.heading}>{item}</Typography>
                <Typography className={classes.notes}>
                    {notes}
                </Typography>
            </div>
          </ExpansionPanelSummary>

          </ExpansionPanel>


        {/* <Link style={linkStyles} to={`/expenses/${expense._id}`}>
            <h1>{item}</h1>
        </Link>
            <p>${amount}</p>
            <p>{new Date(date).toLocaleDateString()}</p>
            <p>{category}</p>
            <p>{notes}</p>
            {showControls && allowEditDelete && (
                <div>
                <button onClick={handleDelete}>Delete</button>
                <button onClick={handleEdit}>Edit</button>
                </div>
            )} */}
        </div>
    )
}

export default Expense