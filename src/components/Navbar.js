import React ,{useEffect} from 'react'
import { Link, useLocation } from 'react-router-dom'

const Navbar = (props) => {

    let location = useLocation();
    useEffect(() => {
        // console.log(location.pathname);
    }, [location]);

    return (
        <>
        <nav className={`navbar navbar-expand-lg navbar-light bg-${props.mode}`}>
            <div className="container-fluid">
                <Link  className={`navbar-brand text-${props.text}`} to="/home">OnlyNotes</Link>
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
                        <input className="form-check-input" onClick={props.togglemode} type="checkbox" role="switch" id="flexSwitchCheckDefault" />
                        <label className={`form-check-label text-${props.text}`} htmlFor="flexSwitchCheckDefault">Dark-mode</label>
                    </div> 

                    <form className="d-flex" role="search">
                        <Link className="btn btn-primary mx-2" type="submit" to="/login">Login</Link>
                        <Link className="btn btn-primary" type="submit" to="/signup">SignUp</Link>
                    </form>
                    
                </div>
            </div>
        </nav>
        </>
    )
}

export default Navbar
