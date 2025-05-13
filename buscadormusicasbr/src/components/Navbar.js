import React from 'react'
import logoNavbar from "../images/reinomusica.svg"
import '../css/Navbar.css';

export default function Navbar() {
  return (
    <div>

        <nav className="nav">
          <div className="container-fluid">
              <a className="navbar-brand" href="/">
                  <img className="img-fluid" src={logoNavbar}></img>
              </a>
          </div>
        </nav>
        
    </div>
  )
}
