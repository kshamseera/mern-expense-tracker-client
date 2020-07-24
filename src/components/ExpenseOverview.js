import React from 'react';
import{Link} from 'react-router-dom'
import {useGlobalState} from '../config/store'
import {getMonthTotal,getTodayTotal,getYesterdayTotal} from '../services/expenseServices'

const ExpenseOverview = () => {
    const linkStyles={
        fontSize: '1.2em',
        textDecoration: 'none',
        margin: '.5em'
    }
    const formStyle= {
        maxWidth : "500px",
        margin: "2rem auto",
        // border: "2px solid black",
        padding: "2rem",
        fontFamily: "sanSerif",
        backgroundColor: "white",
       
    }
    const labelStyle ={
        display:"block",
        padding:"1rem 0 .5rem 0",
        fontSize:"22px",
        color:"brown"
    }
    
    const {store} = useGlobalState()
    const {expenses} =store
    // console.log("expense",expenses)
    const monthTotal =getMonthTotal(expenses)
    const todayTotal = getTodayTotal(expenses)
    const yesterdayTotal = getYesterdayTotal(expenses)
    
    return ( 
    <div style ={formStyle}>
        <div>
            <h3>You have spent</h3>
                <p>${monthTotal}</p> 
                <p>So far this month</p>
        </div>
        <form>
            
                <label style= {labelStyle} >Today</label>
                <input type ="text" readOnly value ={todayTotal} ></input> 
            
                <label style= {labelStyle} >Yesterday</label>
                <input type ="text" readOnly value ={yesterdayTotal}></input> 
            
        </form> 
        <div>
            <Link style= {linkStyles} to ='/expenses/all'>See More</Link>
        </div>   
    </div>
     );
}
 
export default ExpenseOverview;