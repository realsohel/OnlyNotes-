import React, { useState } from 'react'
import { useNavigate } from "react-router-dom"

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
                props.showAlert("Logged in Successfully." , "success:");
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
        <div className='container justify-center'>
            <h1 className='d-flex justify-content-center'> Login </h1>

            <form className='container  justify-content-center' onSubmit={handlesubmit}>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="email" name="email" aria-describedby="emailHelp" value={credentials.email} onChange={onChange}/>
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" id="password" name="password" value={credentials.password} onChange={onChange}/>
                </div>
                
                <div className="container d-flex justify-content-center my-4">
                <button type="submit " className="btn btn-primary " >Submit</button>
                </div>
            </form>
        </div>
    )
}

export default Login
