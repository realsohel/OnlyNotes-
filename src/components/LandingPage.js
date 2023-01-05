import React from 'react'
import { Link ,useNavigate} from 'react-router-dom'
import logoweb3_edit from './logoweb3_edit.png'


const LandingPage = (props) => {
    let history = useNavigate();
    const handleLogout=()=>{
        localStorage.removeItem('token');
        history('/')
    }
    return (
        <>
        <div className='container d-flex justify-content-center my-5  animate__animated animate__backInDown'>
        <img src={logoweb3_edit} alt="" />
        </div>
        <div style={{marginBottom: '288px'}} className={` text-${props.text}`}>
            <h2 className='container animate__animated animate__backInDown'>
                OnlyNotes - Where you can store your notes on the cloud securely. 
            </h2>
            {!localStorage.getItem('token') ? <div className="container d-flex justify-content-center my-4 mt-5">
                <Link type="button " className="btn btn-primary mx-2"  to='login' >Login</Link>
                <Link type="button " className="btn btn-primary mx-2" to='signup'>SignUp</Link>
            </div>: <div className="container container d-flex justify-content-center my-4 mt-5">
            <button className="  btn btn-primary mx-2 " onClick={handleLogout}>Logout</button></div>}
        </div>
        </>
    )
}

export default LandingPage
