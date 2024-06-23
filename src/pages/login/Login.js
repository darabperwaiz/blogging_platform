import React, { useState } from 'react'
import './login.css'
import axios from "axios"
import { Link, Navigate, redirect, useNavigate } from "react-router-dom"

const Login = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate()
    const handleLogin = async (e) => {
        e.preventDefault()
       try {
        const data = await axios({
            method: 'post',
            url: "http://localhost:7000/api/v1/user/login",
            data: {
                email: email,
                password: password
            }
        })
        if(data.status == 200) {
            localStorage.setItem('blog_token', data.data.token);
            window.location.href= "/"
        }
       } catch (error) {
        console.log(error)
       }
    }
  return (
    <div className="login_container">
        <p>Welcome to Blog</p>
      <form className="login_form" onSubmit={handleLogin}>
        <label htmlFor="">
            Email
        <input type="text" name="email" value={email} placeholder="Email" onChange={(e)=> setEmail(e.target.value)}/>
        </label>
        <label htmlFor="">
            Password
        <input type="password" name="password" value={password} placeholder="password" onChange={(e)=> setPassword(e.target.value)}/>
        </label>
        <button onClick={handleLogin}>Login</button>
      </form>
      <p>Already Registered. <Link to='/signup'>SignUp</Link></p>
    </div>
  )
}

export default Login
