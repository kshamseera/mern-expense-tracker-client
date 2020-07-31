import React from 'react';
import{Link} from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import Typography from '@material-ui/core/Typography'
import {useGlobalState} from '../config/store'
import {getMonthTotal,getTodayTotal,getYesterdayTotal} from '../services/expenseServices'

const useStyles = makeStyles(theme => ({
    card: {
      maxWidth: 800,
      margin: 'auto',
      marginTop: theme.spacing(15),
      marginBottom: theme.spacing(10),
      backgroundColor: "#E8EAF6"
    },
    title2: {
      padding:`32px ${theme.spacing(2.5)}px 2px`,
      color: '#2bbd7e',
      fontsize:'4em'
    },
    totalSpent: {
      padding: '50px 40px',
      fontSize: '4em',
      margin: 20,
      marginBottom: 30,
      backgroundColor: '#01579b',
      color: '#70f0ae',
      textAlign: 'center',
      borderRadius: '50%',
      border: '10px double #70f0ae',
      fontWeight: 300
    },
    spent: {
      margin: '16px 10px 10px 0',
      padding: '10px 30px',
      border: '4px solid #58bd7f38',
      borderRadius: '0.5em'
    },
    day: {
      fontSize: '0.9em',
      fontStyle: 'italic',
      color: '#696969'
    }
  }))

const ExpenseOverview = () => {
    const {store} = useGlobalState()
    const {expenses,loggedInUser} =store
    
    const classes = useStyles()

    const monthTotal =getMonthTotal(expenses)
    const todayTotal = getTodayTotal(expenses)
    const yesterdayTotal = getYesterdayTotal(expenses)
    
    return ( 
        <Card className={classes.card}>
          <Typography variant="h4" className={classes.title2} color="textPrimary" style={{textAlign:'center'}}>Hi {loggedInUser}, you've spent</Typography>
        <div style={{display:'flex', justifyContent:'center', alignItems:'center'}}>
          <Typography component="span" data-cy="monthlySpend" className={classes.totalSpent}>${monthTotal} <span style={{display: 'block', fontSize:'0.3em'}}>So Far This Month</span></Typography>
        <div style={{margin:'20px 20px 20px 30px' }}>
          <Typography variant="h5" className={classes.spent} color="primary">${todayTotal} <span className={classes.day}>Today</span></Typography>  
          <Typography variant="h5" className={classes.spent} color="primary">${yesterdayTotal} <span className={classes.day}>Yesterday </span></Typography>
        <Link to="/expenses/all"><Typography variant="h6">See More</Typography></Link>
        </div>
        </div>  
        </Card>
    );
}
 
export default ExpenseOverview;