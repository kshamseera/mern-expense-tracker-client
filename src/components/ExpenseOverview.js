import React from 'react';
import{Link} from 'react-router-dom'

const expenseOverview = () => {

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

    return ( 
    <div style ={formStyle}>
        <div>
            <h3>You have spent</h3>
                <p>$0</p> 
                <p>So far this month</p>
        </div>
        <form>
            <input type ="text" ></input> 
            <input type ="text"></input> 
        </form> 
        <div>
            <Link style= {linkStyles} to ='/expenses/all'>See More</Link>
        </div>   
    </div>
     );
}
 
export default expenseOverview;