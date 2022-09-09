import React from 'react'
import './Footer.css'

function Footer() {
    return (
        <>
            <footer className="fadeInUp col-md-12">

                <div className="footer-icons">
                    <ul className="navbar-nav ">
                        <li className="nav-item inline-block">
                            <a href="https://github.com/" aria-label="Github" className="nav-link text-github"><i
                                className="fa fa-github"></i></a></li>
                        <li className="nav-item inline-block">
                        </li>
                        <li className="nav-item inline-block"><a href="https://www.instagram.com/" aria-label="Insagram" className="nav-link"><i className="fa fa-instagram"
                        ></i></a>
                        </li>
                        <li className="nav-item inline-block"><a href="https://www.linkedin.com/" aria-label="LinkedIn" className="nav-link"><i className="fa fa-linkedin"
                        ></i></a>
                        </li>
                    </ul>
                </div>
            </footer>
            <h5 className="text-center copyright"> NewsApp © Copyrights 2022</h5>
        </>
    )
}

export default Footer
