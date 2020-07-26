import React, {useState} from 'react'
import {useGlobalState} from '../config/store'
import {loginUser} from '../services/authServices'
import {fetchExpenses} from '../services/expenseServices'

const SignIn = ({history}) => {
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
        // padding: "80px 40px
    }
    const labelStyle ={
        display:"block",
        padding:"1rem 0 .5rem 0",
        fontSize:"22px",
        color:"brown"
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
        <form style ={formStyle} data-cy="loginForm" onSubmit={handleSubmit}>
            {errorMessage && <p>{errorMessage}</p>}
            <div>
                <label style ={labelStyle} >Username</label>
                <input style ={inputStyle}required type="text" name="username" placeholder="Enter a username" data-cy="username" onChange={handleChange}></input>
            </div>
            <div>
                <label style ={labelStyle}>Password</label>
                <input style ={inputStyle} required type="password" name="password" placeholder="Enter a password" data-cy="password" onChange={handleChange}></input>
            </div>
            <div>
                <button style ={buttonStyle} type="submit" value="Login" data-cy="loginButton">Login</button>
            </div>   
        </form>
    )
}

export default SignIn