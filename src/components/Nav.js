import React from 'react';
import {useGlobalState} from '../config/store'
import {logoutUser} from '../services/authServices'
import { makeStyles } from '@material-ui/core'
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import HomeIcon from '@material-ui/icons/Home';
import AddIcon from '@material-ui/icons/Add'
import Avatar from '@material-ui/core/Avatar'
import Person from '@material-ui/icons/Person'

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
   }))

const Nav = () => {
    const classes = useStyles()

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
        <div className={classes.root} data-cy="navbar">
        <AppBar position="static">
            <Toolbar>
                <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu" href="/">
                    <HomeIcon/>
                </IconButton>
                <Typography variant="h6" className={classes.title}>
                </Typography>
                {loggedInUser 
                ? (	<div data-cy="navLoggedIn">
                {/* <span style={space}>{loggedInUser}</span> */}
                <Button href="/expenses/all" color="inherit">All Expenses</Button>
                <Button href="/expenses/new" color="inherit" data-cy="addExpense"><AddIcon style={{marginRight: 4}}/>Add Expense</Button>
                <Button href="/" color="inherit" onClick={handleLogout} data-cy="logout">Logout
                    <Avatar>
                    <Person/>
                    </Avatar>
                </Button>
                </div>)
                : (	<div data-cy="navLoggedOut">
                <Button href="/auth/register" color="inherit" data-cy="signUp">SignUp</Button>
                <Button href="/auth/login" color="inherit" data-cy="signIn">SignIn</Button>
                 </div>)
               }   
            </Toolbar>
        </AppBar>
        </div>
     )
}
 
export default Nav