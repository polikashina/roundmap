import * as React from 'react'
import {useState} from 'react'
import {NavLink } from 'react-router-dom'

const Signup:React.FC = () => {
    const [loginValue, setLoginValue] = useState('')
    const [passwordValue, setPasswordValue] = useState('')
    console.log("render signup", loginValue, passwordValue)

    const onLoginChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setLoginValue(e.target.value)
    }

    const onPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPasswordValue(e.target.value)
    }

    return (
        <form>
            <h2>Sign Up</h2>
            <label>Email: <input type="text" onChange={onLoginChange}/></label>
            <label>Password: <input type="password" onChange={onPasswordChange}/></label>
            <button>Sign Up</button>
            <NavLink to="/signin">Sign in</NavLink>
        </form>
    )
}

export {Signup}
