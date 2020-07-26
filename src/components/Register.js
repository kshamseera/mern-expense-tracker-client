import React, {useState} from 'react'
import {useGlobalState} from '../config/store'
import {registerUser} from '../services/authServices'

const Register = ({history}) => {
    const formStyle= {
        maxWidth : "500px",
        margin: "2rem auto",
        border: "2px solid black",
        padding: "2rem",
        fontFamily: "sanSerif",
        backgroundColor: "white",
        // position: "relative",
        // left:"50%",
        // top:"50%",
        transform: "translate(-50% -50%)",
        // width: "400px",
        // height:"500px",
        // padding: "80px 40px"
    }
    const labelStyle ={
        display:"block",
        padding:"1rem 0 .5rem 0",
        fontSize:"22px",
        color:"Brown"
    }

    const inputStyle ={
        display: "block",
        width: "100%",
        // border: "1px solid #298089",
        border:"none",
        padding:".5rem",
        fontSize: "18px",
        borderRadius: "5px",
        background: "transparent",
        borderBottom:"1px solid #000",
        // outline:"none"

    }
    const buttonStyle ={
        display: "block",
        border:"0",
        width:"auto",
        borderRadius: "5px",
        background: "#343050",
        fontSize: "20px",
        padding: ".5rem",
        color: "white",
        margin:".7rem 0",
        cursor: "pointer",
        outline:"none"
    }

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
        <form style = {formStyle} onSubmit={handleSubmit} data-cy="registerFrom">
            {errorMessage && <p>{errorMessage}</p>}
            <div>
                <label style = {labelStyle}>Username</label>
                <input style = {inputStyle} required type="text" name="username" placeholder="Enter a username" data-cy="username" onChange={handleChange}></input>
            </div>
            <div>
                <label style = {labelStyle}>Email</label>
                <input style = {inputStyle}required type="email" name="email" placeholder="Enter an email" data-cy="email" onChange={handleChange}></input>
            </div>
            <div>
                <label style = {labelStyle}>Password</label>
                <input style = {inputStyle} required type="password" name="password" placeholder="Enter a password" data-cy="password" onChange={handleChange}></input>
            </div>
            <div>
                <button style = {buttonStyle} type="submit" value="Register" data-cy="registerButton">Register</button>
            </div>
            
        </form>
    )
}

export default Register