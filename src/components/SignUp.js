import React, { useState } from 'react'
import { useNavigate, Link } from "react-router-dom"

const SignUp = (props) => {
    const [credentials, Setcredentials] = useState({name: "" , email:"" , password:"" , cpassword:""});
    let history = useNavigate()

    const handlesubmit= async (e)=>{
        e.preventDefault();
        const response = await fetch("http://localhost:5000/api/auth/createuser", {
            
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({name: credentials.name , email: credentials.email , password: credentials.password }) // body data type must match "Content-Type" header
        });
        
            const json = await response.json();
            console.log(json);

            if(json.success){
                //redirect
                localStorage.setItem('token' , json.authtoken);
                props.showAlert("Account created Successfully." , "success");
                history("/home");

            }
            else{
                props.showAlert("Invalid Credentials" , "danger");
            }
    }

    const onChange = (e)=>{
        Setcredentials({...credentials , [e.target.name]: e.target.value});
        // console.log(credentials)
    }


    return (
        <div className={`container justify-center border border-${props.mode} bg-${props.mode==='dark'?'#171717':'light'} text-${props.text}`}>
            <h1 className='d-flex justify-content-center my-3'> SignUp </h1>

            <form className='container  justify-content-center' onSubmit={handlesubmit}>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label"><b>Your name</b> </label>
                    <input type="text" className={`form-control bg-${props.mode} text-${props.text} `} id="name" name="name" aria-describedby="emailHelp" value={credentials.name} onChange={onChange}/>
                    
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label"><b>Email address</b></label>
                    <input type="email" className={`form-control bg-${props.mode} text-${props.text} `} id="email" name="email" aria-describedby="emailHelp" value={credentials.email} onChange={onChange}/>
                    <div id="emailHelp" className="form-text">Neccesary.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label"><b>Password</b></label>
                    <input type="password" className={`form-control bg-${props.mode} text-${props.text} `} id="password" name="password" value={credentials.password} onChange={onChange} minLength={5} required/>
                    <div id="emailHelp" className="form-text">Minimum 5 characters.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="cpassword" className="form-label"><b>Confirm Password</b></label>
                    <input type="password" className={`form-control bg-${props.mode} text-${props.text} `} id="cpassword" name="cpassword" value={credentials.cpassword} onChange={onChange} minLength={5} required/>
                </div>
                
                <div className="container d-flex justify-content-center my-4">
                <button type="submit " disabled={credentials.password!==credentials.cpassword} className="btn btn-primary container d-flex justify-content-center my-4 mt-5" >SignUp</button>
                </div>
                <div className="container d-flex justify-content-center my-4">
                <p className="small fw-bold mt-2 pt-1 mb-0">Already have an account? <Link to="/login"
                className="link-danger">Login</Link></p>
                </div>
            </form>
        </div>
    )
}

export default SignUp
