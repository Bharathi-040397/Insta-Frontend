import React from 'react'
import Navbar from 'react-bootstrap/Navbar'
import Nav from "react-bootstrap/Nav";
import { Link } from 'react-router-dom'
import './Navbar.css'



function Navbar1() {
  
  return (
     <>
      <Navbar className="navbar" bg="light" expand="lg">
      <Navbar.Brand className="nav_brand"><Link to='/' style={{textDecorationLine:'none'}}>Instagram</Link></Navbar.Brand>
        <Nav className="nav_item">
          <Nav.Link className="nav_link"><Link to="/signup" style={{ textDecorationLine: 'none' }}>Signup</Link></Nav.Link>
          <Nav.Link className="nav_link"><Link to="/signin" style={{ textDecorationLine: 'none' }}>Signin</Link></Nav.Link>
         </Nav>
       </Navbar>
      </>
          )
}

export default Navbar1
