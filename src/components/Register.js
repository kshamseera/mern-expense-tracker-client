import React, {useState} from 'react'
import {useGlobalState} from '../config/store'
import {registerUser} from '../services/authServices'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'

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
   

const Register = ({history}) => {
    const classes = useStyles()
    const initialFormState = {
        username: "",
        email: "",
        password: ""
    } 
    const [userDetails,setUserDetails] = useState(initialFormState)
    const [ errorMessage,setErrorMessage] = useState(null)
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
        registerUser(userDetails).then(() => {
            dispatch({
                type: "setLoggedInUser",
                data: userDetails.username
            })
            history.push("/")
        }).catch((error) => {
            const status = error.response ? error.response.status : 500
			if(status === 409) {
				// This username is already registered. Let the user know.
				setErrorMessage("This username already exists. Please login, or specify another username.")				
            }
            else {
                // There was some other error - maybe the server or db is down
                setErrorMessage("There may be a problem with the server. Please try again after a few moments.")
            }
			console.log(`registration failed with error: ${error} and status ${status}`)
        })
    }
    return (
    <div>
      <Card className={classes.card}>
        <CardContent>
            <Typography component="p" color="error">{errorMessage && <p>{errorMessage}</p>}</Typography>
            <Typography variant="h6" className={classes.title} fontSize="22px">  
                Sign Up
            </Typography>
            <TextField id="name" label="Username" className={classes.textField} name= "username" onChange={handleChange} margin="normal"/><br/>
            <TextField id="email" label="Email" type="email" className={classes.textField} name= "email" onChange={handleChange} margin="normal"/><br/>
            <TextField id="password" label="Password" type="password" className={classes.textField} name= "password" onChange={handleChange} margin="normal"/><br/>
        </CardContent> 
        <CardActions>
            <Button color="primary" variant="contained" onClick={handleSubmit} className={classes.submit}>Register</Button>
       </CardActions>
      </Card>
    </div>
    )
}

export default Register