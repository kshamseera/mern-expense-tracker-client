import React, {useState} from 'react'
import {useGlobalState} from '../config/store'
import {loginUser} from '../services/authServices'
import {fetchExpenses} from '../services/expenseServices'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import PersonIcon from '@material-ui/icons/Person'
import LockOpenIcon from '@material-ui/icons/LockOpen';

const useStyles = makeStyles(theme => ({
    card: {
      maxWidth: 800,
      margin: 'auto',
      textAlign: 'center',
      marginTop: theme.spacing(20),
      paddingBottom: theme.spacing(2),
      backgroundColor: "#E8EAF6"
    },
    error: {
      verticalAlign: 'middle',
      color: 'red'
    },
    icon: {
        margin: '35px 10px 0 0',
        color: theme.palette.action.active,
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
    submit: {
      margin: 'auto',
      marginBottom: theme.spacing(2)
    },
   }))

const SignIn = ({history}) => {
    const classes = useStyles()
    const initialFormState = {
        username: "",
        password: ""
    } 
    const [userDetails,setUserDetails] = useState(initialFormState)
    const [errorMessage, setErrorMessage] = useState(null)
    const {dispatch} = useGlobalState()

    function handleChange(event) {
        const name = event.target.name
        const value = event.target.value
        setUserDetails({
            ...userDetails,
            [name]: value
        })
    }
    function handleSubmit(event) {
        event.preventDefault()
        // Attempt login on server
        loginUser(userDetails).then((response) => {
            dispatch({
                type: "setLoggedInUser",
                data: userDetails.username
            })
            fetchExpenses(dispatch)
            history.push("/")
       
        }).catch((error) => {
            if (error.response && error.response.status === 401)
                setErrorMessage("Authentication failed. Please check your username and password.")
            else   
                setErrorMessage("There may be a problem with the server. Please try again after a few moments.")
        })		
    }
    return (
        <div>
            <Card className={classes.card} data-cy="signInForm">
                <CardContent>
                    <Typography component="p" color="error">{errorMessage && <p>{errorMessage}</p>}</Typography>
                    <Typography variant="h6" className={classes.title} fontSize="22px">  
                        Sign In
                    </Typography>
                    <PersonIcon className={classes.icon} />
                    <TextField id="name" label="Username" data-cy="username" className={classes.textField} name= "username" onChange={handleChange} margin="normal"/><br/>
                    <LockOpenIcon className={classes.icon} />
                    <TextField id="password" label="Password" type="password" data-cy="password" className={classes.textField} name= "password" onChange={handleChange} margin="normal"/><br/>
                </CardContent> 
                <CardActions>
                    <Button color="primary" variant="contained" data-cy="signInButton" onClick={handleSubmit} className={classes.submit}>Sign In</Button>
                </CardActions>
            </Card>
        </div>
    )
}

export default SignIn