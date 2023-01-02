import React from 'react'

const Footer = () => {
    return (
        <>
        <footer style={{marginTop: "150px"}} className='position-sticky bg-primary'>
        <div className="d-flex flex-column flex-md-row text-center text-md-start justify-content-between py-4 px-4 px-xl-5 bg-primary">
            {/* <!-- Copyright --> */}
            <div className="text-white mb-3 mb-md-0">
            Copyright © 2020. All rights reserved.
            </div>
            {/* <!-- Copyright --> */}

            {/* <!-- Right --> */}
            <div > 
                {/* <p className="text-white me-4"><b> Follow me on: </b> </p> */}
            <a  href="https://www.facebook.com/sohail.salmani.3975" target="_blank" className="text-white me-4">
            <i className="fa-brands fa-facebook"></i>
            </a>
            <a   href="https://twitter.com/real_sohel_" target="_blank" className="text-white me-4">
                <i className="fab fa-twitter"></i>
            </a>
            <a href="https://www.instagram.com/sohail.salmani.400054/" target="_blank" className="text-white me-4">
                <i className="fab fa-instagram"></i>
            </a>
            <a href="https://www.linkedin.com/in/mohd-sohel-salmani-957603226/" target="_blank"className="text-white">
                <i className="fab fa-linkedin-in"></i>
            </a>
            </div>
            <div className="text-white me-4"> <b> Contact:</b> salmanisohail26@gmail.com  </div>
            {/* <!-- Right --> */}
        </div>
        </footer>
        </>
    )
}

export default Footer
