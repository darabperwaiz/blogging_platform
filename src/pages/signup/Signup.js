import axios from "axios"
import React, { useState } from 'react'
import { Link } from "react-router-dom"

const Signup = () => {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleSignup = async (e) => {
    e.preventDefault()
    await axios({
      method: 'post',
      url: 'http://localhost:7000/api/v1/user/signup',
      data: {
        name: name,
        email: email,
        password: password
      }
    })

    window.location.href = '/login'
  }
  return (
    <div className="login_container">
    <p>Welcome to Blog</p>
  <form className="login_form" onSubmit={handleSignup}>
  <label htmlFor="">
        Name
    <input type="text" name="name" value={name} placeholder="Full Name" onChange={(e)=> setName(e.target.value)}/>
    </label>
    <label htmlFor="">
        Email
    <input type="text" name="email" value={email} placeholder="Email" onChange={(e)=> setEmail(e.target.value)}/>
    </label>
    <label htmlFor="">
        Password
    <input type="password" name="password" value={password} placeholder="password" onChange={(e)=> setPassword(e.target.value)}/>
    </label>
    <button onClick={handleSignup}>Signup</button>
  </form>
  <p>New User. <Link to='/login'>Login</Link></p>
</div>
  )
}

export default Signup
