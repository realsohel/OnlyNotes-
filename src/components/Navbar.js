import React ,{useEffect} from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import logoweb3_edit from "./logoweb3_edit.png"

const Navbar = (props) => {

    let location = useLocation();
    useEffect(() => {
        // console.log(location.pathname);
    }, [location]);

    let history = useNavigate();
    const handleLogout=()=>{
        localStorage.removeItem('token');
        history('/login');
    }

    return (
        <>
        <nav className={` web_navbar navbar fixed-top navbar-expand-lg navbar-light bg-${props.mode} `}>
            <div className="container-fluid">
                <Link  className={`logo navbar-brand text-${props.text}`}  to="/"><img src={logoweb3_edit} alt="abc"  style={{height:"50%" ,width:"150px"}}/></Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link className={`nav-link ${location.pathname==='/home'?"active":""} text-${props.text}`} aria-current="page" to="/home">Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link className={`nav-link ${location.pathname==='/about'?"active":""} text-${props.text}`} to="/about">About</Link>
                        </li>
                    </ul>
                    <div className="form-check form-switch">
                        <label className={`form-check-label text-${props.text}`} htmlFor="flexSwitchCheckDefault"><b> Dark-mode </b></label>
                        <input className="form-check-input" onClick={props.togglemode} type="checkbox" role="switch" id="flexSwitchCheckDefault" />
                        </div> 

                    {!localStorage.getItem('token') ?<form className="d-flex" role="search">
                        <Link className="btn btn-primary mx-2" type="submit" to="/login">Login</Link>
                        <Link className="btn btn-primary" type="submit" to="/signup">SignUp</Link>
                    </form>: <button className="btn btn-primary mx-2" onClick={handleLogout}>Logout</button> }
                    
                </div>
            </div>
        </nav>
        </>
    )
}

export default Navbar
