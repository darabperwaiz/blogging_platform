import React, { useContext, useEffect, useState } from 'react'
import { Link, Navigate, Outlet } from "react-router-dom"
import style from "./navbar.module.css"
import { FaAngleDown } from "react-icons/fa6";
import { IoMdExit } from "react-icons/io";
import { MdDashboard } from "react-icons/md";
import { AuthContext } from "../../AuthContext";
import { jwtDecode } from "jwt-decode";
const Navbar = () => {
  const {isLogin} = useContext(AuthContext);
  const [decode, setDecode] = useState('')
  
  useEffect(()=> {
    const token = localStorage.getItem('blog_token') || null
    if(!token) {
      return
    }
    const decode = jwtDecode(token)
    setDecode(decode)
  }, [])

  const handleLogout = () => {
    localStorage.removeItem('blog_token');
    const token = localStorage.getItem('blog_token') || null
    if(!token) return window.location.href = '/'
  }
  return (
    <>
      <nav>
        <Link className={style.brand} to='/'>Blog.</Link>
        <div className={style.left_menu}>
            {isLogin ? 
            <div className={style.dropdown}>
                <p>{decode.name} <FaAngleDown /></p>
                <ul className={style.dropdown_menu}>
                    <Link to='/user/dashboard'><li><MdDashboard /> Dashboard</li></Link>
                    <li onClick={handleLogout}> <IoMdExit /> Logout</li>
                </ul>
            </div>
            :
            <Link className={style.login_text} to='/login'>Login</Link>            
            }
        </div>
      </nav>
      <Outlet />
    </>
  )
}

export default Navbar
