import Home from "./pages/Home/Home";
import './App.css';
import { createBrowserRouter, Navigate, RouterProvider } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Detail from "./pages/Detail/Detail";
import Login from "./pages/login/Login";
import Signup from "./pages/signup/Signup";
import { useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import Dashboard from "./pages/Dashboard/Dashboard";

const PrivateRoute = ({children}) => {
  const token = localStorage.getItem('blog_token')
  console.log(token)
  if(!token) return <Navigate to="/login" replace={true} />
  
  return children
}

const ProtectLogin = ({children}) => {
  const token = localStorage.getItem('blog_token')
  if(token) return <Navigate to='/' replace={true} />
  return children
}


const router = createBrowserRouter([
  {
    path: '/', element: <Navbar />,
    children: [
      {
        index: true, element: <Home />
      },
      {
        path: "view/:id", element: <Detail />
      },
      {
        path: "login", element:(<ProtectLogin><Login /></ProtectLogin>)
      },
      {
        path: "signup", element: <Signup />
      },
      {
        path: 'user/dashboard', element:(<PrivateRoute> <Dashboard /></PrivateRoute>),
      }
    ]
  },
  
])

function App() {
  const [isLogin, setIsLogin] = useState(false)
    
  const token = localStorage.getItem('blog_token') || null
    useEffect(()=> {
      if(token) {
        setIsLogin(true)
      } else {
        setIsLogin(false)
      }
    }, [token])

  return (
    <>
    <AuthContext.Provider value={{isLogin}}>
    <RouterProvider router={router} />
    </AuthContext.Provider>
    </>
  );
}

export default App;
