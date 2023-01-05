import React, { useState } from 'react'
import { Link, useNavigate } from "react-router-dom"
import logoweb3_edit from './logoweb3_edit.png'

const Login = (props) => {

    const [credentials, Setcredentials] = useState({email:"" , password:""});
    let history = useNavigate()

    const handlesubmit= async (e)=>{
        e.preventDefault();
        const response = await fetch("http://localhost:5000/api/auth/login", {
            
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({email: credentials.email , password: credentials.password }) // body data type must match "Content-Type" header
        });
        
            const json = await response.json();
            console.log(json);

            if(json.success){
                //redirect
                localStorage.setItem('token' , json.authtoken);
                props.showAlert("Logged in Successfully." , "success");
                history("/home");

            }
            else{
                props.showAlert("Login with proper Credentials." , "danger");
            }
    }

    const onChange = (e)=>{
        Setcredentials({...credentials , [e.target.name]: e.target.value});
        // console.log(credentials)
    }


    return (
        <>
        <div className='container d-flex justify-content-center mb-4 '>
        <img src={logoweb3_edit} style={{width:"25%"}} alt="" />
        </div>
        <div className={`container justify-center border border-${props.mode} bg-${props.mode==='dark'?'#171717':'light'} text-${props.text}`}>
            <h1 className='d-flex justify-content-center my-3'> Login </h1>

            <form className='container  justify-content-center' onSubmit={handlesubmit}>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label"><b>Email address</b></label>
                    <input type="email" className={`form-control bg-${props.mode} text-${props.text} `} id="email" name="email" aria-describedby="emailHelp" value={credentials.email} onChange={onChange}/>
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label"><b>Password</b></label>
                    <input type="password" className={`form-control bg-${props.mode} text-${props.text} `} id="password" name="password" value={credentials.password} onChange={onChange}/>
                    <div id="emailHelp" className="form-text">Enter the correct password.</div>
                </div>
                
                <div className="container d-flex justify-content-center my-4">
                <button type="submit " className="btn btn-primary container d-flex justify-content-center my-4 mt-5 " >Login</button>
                </div>
                <div className="container d-flex justify-content-center my-4">
                <p className="small fw-bold mt-2 pt-1 mb-0">Don't have an account? <Link to="/signup"
                className="link-danger">SignUp</Link></p>
                </div>
            </form>
        </div>
        </>
    )
}

export default Login
