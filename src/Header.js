import {Link} from "react-router-dom";
import {useContext, useEffect, useState} from "react";
import { UserContext } from "./UserContext";
// import { NavLink } from "react-router-dom";
import LogoS from '../src/assets/mtmlc.png'

import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Offcanvas from 'react-bootstrap/Offcanvas';




// import { useState } from 'react';
import Modal from 'react-bootstrap/Modal';

import "bootstrap/dist/css/bootstrap.min.css";

export default function Header() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  // const base_url = 'http://localhost:4000';
  const base_url = `https://mtmm1-2-backend.onrender.com`;
  // const [userInfo, setUserInfo] =  


  // const {setUserInfo,userInfo} = useContext(UserContext);

  const { setUserInfo, userInfo } = useContext(UserContext);
  const storedUser = localStorage.getItem('user');

  useEffect(() => {
    const checkUserSession = async () => {
      try {
        const response = await fetch(`${base_url}/user`, {
          method: 'GET',
          credentials: 'include',  // Include credentials (cookies) in the request
        });

        if (response.ok) {
          const userInfo = await response.json();
          setUserInfo(userInfo);
          // setRedirect(true);
        } else {
          // Handle unauthorized or other errors
        }
      } catch (error) {
        console.error('An error occurred while checking user session:', error);
      }
    };

    if (storedUser) {
      setUserInfo(JSON.parse(storedUser));
      checkUserSession(); // Check user session on page load
    }
  }, [setUserInfo, storedUser]);

      
  // useEffect(() => {
  //   fetch(`${base_url}/profile`, {
  //     credentials: 'include',
  //   })
  //     .then(response => response.json())
  //     .then(userInfo => setUserInfo(userInfo))
  //     .catch(error => console.error('Error fetching user profile:', error));
  // }, [setUserInfo]);

  function logout() {
    fetch(`${base_url}/logout`, {
      credentials: 'include',
      method: 'POST',
    });
    setUserInfo(null);
  }

  const username = userInfo?.username;
  const writer = userInfo?.writer;
      // alert('userInfo.writer:', userInfo?.username);

  return (
    <div className="headercolour">
    <header>
      <div className="headerup">
      <Link to="/" className="logo">
        <img src={LogoS} alt="" />
        Matters that Matter
        </Link>
      {/* <Link to="/" className="brandname"> */}
        {/* <img src={LogoS} alt=""/> */}
          {/* Matters that Matter</Link> */}
      {/* <nav>
        {username && (
          <>
            <Link to="/create">Create new post</Link>
            <a onClick={logout}>Logout ({username})</a>
          </>
        )}
        {!username && (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </nav> */}
      {/* </div> */}
      <>
      {[0].map((expand) => (
        <Navbar bg="#F05941" data-bs-theme="dark" key={expand} expand={expand} className="bg-body-tertiary-dark mb-3"
        >
          <Container fluid>
            {/* <Navbar.Brand href="#"> MA Matters That Matter</Navbar.Brand> */}
            <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`}
                className="custom-toggle-icon"
              // style={{ color: 'white' }}
              style={{ border: '2px solid white' }}
            />
            <Navbar.Offcanvas
              id={`offcanvasNavbar-expand-${expand}`}
              aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
              placement="end"
            >
              <Offcanvas.Header closeButton>
                <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
                  Matters That Matter
                  
                </Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body>
                <Nav className="justify-content-end flex-grow-1 pe-3">
                  <h6>Personal</h6>
                  <Nav className="user-info">
                    {username && (
                      <>
                        <div className="toggleitems">
                          <p>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-person-fill-check" viewBox="0 0 16 16">
                              <path d="M12.5 16a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7m1.679-4.493-1.335 2.226a.75.75 0 0 1-1.174.144l-.774-.773a.5.5 0 0 1 .708-.708l.547.548 1.17-1.951a.5.5 0 1 1 .858.514ZM11 5a3 3 0 1 1-6 0 3 3 0 0 1 6 0"/>
                              <path d="M2 13c0 1 1 1 1 1h5.256A4.493 4.493 0 0 1 8 12.5a4.49 4.49 0 0 1 1.544-3.393C9.077 9.038 8.564 9 8 9c-5 0-6 3-6 4"/>
                            </svg>
                            &nbsp;Signed in as: {username}
                          </p>
                        </div>
                        {writer === 0 && (
                          <div className="toggleitems">
                            <Link to="/Join">
                              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-file-earmark-plus-fill" viewBox="0 0 16 16">
                                <path d="M9.293 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V4.707A1 1 0 0 0 13.707 4L10 .293A1 1 0 0 0 9.293 0M9.5 3.5v-2l3 3h-2a1 1 0 0 1-1-1M8.5 7v1.5H10a.5.5 0 0 1 0 1H8.5V11a.5.5 0 0 1-1 0V9.5H6a.5.5 0 0 1 0-1h1.5V7a.5.5 0 0 1 1 0" />
                              </svg>
                              &nbsp;Join as writer</Link>

                          </div>
                        )}
                        {writer === 1 && (
                          <div className="toggleitems">
                            <Link to="/create">
                              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-file-earmark-plus-fill" viewBox="0 0 16 16">
                                <path d="M9.293 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V4.707A1 1 0 0 0 13.707 4L10 .293A1 1 0 0 0 9.293 0M9.5 3.5v-2l3 3h-2a1 1 0 0 1-1-1M8.5 7v1.5H10a.5.5 0 0 1 0 1H8.5V11a.5.5 0 0 1-1 0V9.5H6a.5.5 0 0 1 0-1h1.5V7a.5.5 0 0 1 1 0" />
                              </svg>
                              &nbsp;Create new post</Link>
                          </div>
                        )}  
                        <div className="toggleitems">
                          <a onClick={handleShow}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-person-dash" viewBox="0 0 16 16">
                              <path d="M12.5 16a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7M11 12h3a.5.5 0 0 1 0 1h-3a.5.5 0 0 1 0-1m0-7a3 3 0 1 1-6 0 3 3 0 0 1 6 0M8 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4"/>
                              <path d="M8.256 14a4.474 4.474 0 0 1-.229-1.004H3c.001-.246.154-.986.832-1.664C4.484 10.68 5.711 10 8 10c.26 0 .507.009.74.025.226-.341.496-.65.804-.918C9.077 9.038 8.564 9 8 9c-5 0-6 3-6 4s1 1 1 1z"/>
                            </svg>
                          &nbsp;Sign out ({username})</a>
                        </div>
                              {/* <Modal show={show} onHide={handleClose}>
                               <Modal.Header closeButton>
                              <Modal.Title>Modal heading</Modal.Title>
                               </Modal.Header>
                               <Modal.Body>Woohoo, you are reading this text in a modal!</Modal.Body>
                               <Modal.Footer>
                                 <Button variant="secondary" onClick={handleClose}>
                                             Close
                                  </Button>
                                 <Button variant="primary" onClick={handleClose}>
                                             Save Changes
                                    </Button>
                                </Modal.Footer>
                                     </Modal> */}
                      </>
                    )}
                  </Nav>
                    <Modal show={show} onHide={handleClose} className="modal">
                               <Modal.Header closeButton>
                              <Modal.Title>Hey there,</Modal.Title>
                               </Modal.Header>
                               <Modal.Body>Do you want to Sign out?</Modal.Body>
                               <Modal.Footer>
                                 <Button variant="secondary" onClick={logout}>
                                          
                                           <Nav.Item>
                                           <Link to="/login">Yes, I do.</Link>
                                           </Nav.Item>
                                  </Button>
                                 <Button variant="primary" onClick={handleClose}>
                                             No, I want to stay.
                                    </Button>
                                </Modal.Footer>
                                     </Modal>
                  <Nav>
                    {!username && (
                      <>
                       <div className="toggleitems">
                        <Link to="/login">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-person-fill-add" viewBox="0 0 16 16">
                        <path d="M12.5 16a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7m.5-5v1h1a.5.5 0 0 1 0 1h-1v1a.5.5 0 0 1-1 0v-1h-1a.5.5 0 0 1 0-1h1v-1a.5.5 0 0 1 1 0m-2-6a3 3 0 1 1-6 0 3 3 0 0 1 6 0"/>
                        <path d="M2 13c0 1 1 1 1 1h5.256A4.493 4.493 0 0 1 8 12.5a4.49 4.49 0 0 1 1.544-3.393C9.077 9.038 8.564 9 8 9c-5 0-6 3-6 4"/>
                        </svg>
                        &nbsp;Sign in</Link>
                       </div>      
                       <div className="toggleitems">
                        <Link to="/register">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-person-add" viewBox="0 0 16 16">
                        <path d="M12.5 16a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7m.5-5v1h1a.5.5 0 0 1 0 1h-1v1a.5.5 0 0 1-1 0v-1h-1a.5.5 0 0 1 0-1h1v-1a.5.5 0 0 1 1 0m-2-6a3 3 0 1 1-6 0 3 3 0 0 1 6 0M8 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4"/>
                        <path d="M8.256 14a4.474 4.474 0 0 1-.229-1.004H3c.001-.246.154-.986.832-1.664C4.484 10.68 5.711 10 8 10c.26 0 .507.009.74.025.226-.341.496-.65.804-.918C9.077 9.038 8.564 9 8 9c-5 0-6 3-6 4s1 1 1 1z"/>
                        </svg>
                        &nbsp;Register</Link>
                       </div>                                    
                      </>
                      )}
                  </Nav>
                  {/* <Link href="#action2">Link</Link> */}
                             <Nav>
                    <>
                      <h6>MTM</h6>
                       <div className="toggleitems">
                                 <Link to="/Home" className="dropdown">Home</Link>

                       </div>      
                       <div className="toggleitems">
                              <Link to="/Archive" className="dropdown">Archive</Link>

                      </div> 
                                            <div className="toggleitems">
                              <Link to="/About" className="dropdown">About</Link>

                       </div> 
                      </>
                  </Nav>
                  <NavDropdown
                    title="Contact Us"
                    id={`offcanvasNavbarDropdown-expand-${expand}`}
                  >
                    <NavDropdown.Item href="https://www.linkedin.com/in/vasundhara-rai-4759a31aa/">
                      <div className="toggleitems">
<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-linkedin" viewBox="0 0 16 16">
  <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854zm4.943 12.248V6.169H2.542v7.225zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248S2.4 3.226 2.4 3.934c0 .694.521 1.248 1.327 1.248zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016l.016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225z"/>
</svg>
                        &nbsp;Editor-in-chief.
                       </div> 
                    </NavDropdown.Item>
                    <NavDropdown.Item href="https://www.linkedin.com/in/vinayak-rai-2416jy/">
                       <div className="toggleitems">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-linkedin" viewBox="0 0 16 16">
  <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854zm4.943 12.248V6.169H2.542v7.225zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248S2.4 3.226 2.4 3.934c0 .694.521 1.248 1.327 1.248zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016l.016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225z"/>
</svg>
                        &nbsp;Senior Developer
                      </div> 
                    </NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item href="https://vinayak-rai.onrender.com/">
                                            <div className="toggleitems">
<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-google" viewBox="0 0 16 16">
  <path d="M15.545 6.558a9.4 9.4 0 0 1 .139 1.626c0 2.434-.87 4.492-2.384 5.885h.002C11.978 15.292 10.158 16 8 16A8 8 0 1 1 8 0a7.7 7.7 0 0 1 5.352 2.082l-2.284 2.284A4.35 4.35 0 0 0 8 3.166c-2.087 0-3.86 1.408-4.492 3.304a4.8 4.8 0 0 0 0 3.063h.003c.635 1.893 2.405 3.301 4.492 3.301 1.078 0 2.004-.276 2.722-.764h-.003a3.7 3.7 0 0 0 1.599-2.431H8v-3.08z"/>
</svg>
                        &nbsp;Senior Developer
                       </div> 
                    </NavDropdown.Item>
                  </NavDropdown>                  
       
                </Nav>

                {/* <Form className="d-flex">
                  <Form.Control
                    type="search"
                    placeholder="Search"
                    className="me-2"
                    aria-label="Search"
                  />
                  <Button variant="outline-success">Search</Button>
                </Form> */}
              </Offcanvas.Body>
            </Navbar.Offcanvas>
          </Container>
        </Navbar>
      ))}
        </>
        </div>
        <div className="headerdw">
         <Nav justify variant="tabs" defaultActiveKey="/home">
              <Link to="/Home" className="nav-link">
                <Nav.Item>
                Home
                </Nav.Item>
            </Link>
              <Link to="/Archive" className="nav-link">
                <Nav.Item>
                Archive
                </Nav.Item>
            </Link>
      {/* <Nav.Item> */}
              <Link to="/About" className="nav-link">
                <Nav.Item>
                About
                </Nav.Item>
            </Link>
      {/* </Nav.Item> */}
      {/*  */}
    </Nav>
        {/* <Nav justify variant="tabs" defaultActiveKey="/home">
      <Nav.Item>
        <Link  href="/home">Home</Link>
      </Nav.Item>
      <Nav.Item>
        <Link href="/Archive">Archive</Link>
      </Nav.Item>
      <Nav.Item>
        <Link href="/About">About</Link>
      </Nav.Item>
    </Nav> */}
    </div>
      
      </header>
      </div>
  );
}