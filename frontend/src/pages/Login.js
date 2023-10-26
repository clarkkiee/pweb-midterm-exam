import axios from 'axios'
import React, { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import {AuthContext} from "../helpers/AuthContext"

function Login() {

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const {setAuthState} = useContext(AuthContext)

    let history = useNavigate()
    const login = () => {
        const dataUser = {username, password}
        axios.post("http://localhost:8000/auth/login", dataUser).then((response) => {
            if(response.data.error) {
                console.log(response.data.error)
            } else {
                localStorage.setItem("accessToken", response.data.token )
                setAuthState({username: response.data.username, id: response.data.id, status: true})
                history('/')
            }
        })
    }

  return (  
    <>
        <h1 className='text-[32px] mt-16 font-bold'>YOU MUST LOGIN FIRST BEFORE ACCESSING HOMEPAGE AND TIMELINE</h1>
        <div className='loginContainer '>
            <label>Username:</label>
            <input type='text' onChange={(e) => setUsername(e.target.value)}/>
            <label>Password:</label>
            <input type='password' onChange={(e) => setPassword(e.target.value)}/>
            <button onClick={login}>Login</button>
        </div>
    
    </>
  )
}

export default Login