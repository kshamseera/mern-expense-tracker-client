import React from 'react';
import {Link} from 'react-router-dom'
import {useGlobalState} from '../config/store'
import {logoutUser} from '../services/authServices'

const Nav = () => {
    
    const divStyles={
        display: 'flex',
        justifyContent: 'space-between',
        backgroundColor: 'lightblue',
        height: '3rem',
        margin:"0px"
    }
    const linkStyles={
        fontSize: '1.4em',
        textDecoration: 'none',
        margin: '.5em'
    }

    // Logout user
    function handleLogout() {
        logoutUser().then((response) => {
            console.log("Got back response on logout", response.status)
        }).catch ((error) => {
            console.log("The server may be down - caught an exception on logout:", error)
        })
        // Even if we catch an error, logout the user locally
        dispatch({
            type: "setLoggedInUser",
            data: null
        })
    }

    const {store, dispatch} = useGlobalState()
    const {loggedInUser} = store


    return ( 
        <div style={divStyles}>
        <Link style={linkStyles} to="/">Home</Link>
        {loggedInUser 
        ? (	<div >
                {/* <span style={space}>{loggedInUser}</span> */}
                <Link style={linkStyles} to={"/expenses/all"}>All Expenses</Link>
                <Link style={linkStyles} to={"/expenses/new"}>Add Expense</Link>
                <Link style={linkStyles} to="/" onClick={handleLogout}>Logout</Link>
            </div>)
        : (	<div>
                <Link style={linkStyles} to="auth/register">SignUp</Link>
                <Link style={linkStyles} to="auth/login">SignIn</Link>
            </div>)
        }   
    </div>
     );
}
 
export default Nav;