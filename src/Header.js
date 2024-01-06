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
                  <Nav.Link to="/login">Personal</Nav.Link>
                  <Nav>
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
                    <Modal show={show} onHide={handleClose}>
                               <Modal.Header closeButton>
                              <Modal.Title>Hey there,</Modal.Title>
                               </Modal.Header>
                               <Modal.Body>Do you want to Sign out?</Modal.Body>
                               <Modal.Footer>
                                 <Button variant="secondary" onClick={logout}>
                                          
                                           <Nav.Item>
                                           <Nav.Link href="/login">Yes, I do.</Nav.Link>
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
                  {/* <Nav.Link href="#action2">Link</Nav.Link> */}
                  <NavDropdown
                    title="More"
                    id={`offcanvasNavbarDropdown-expand-${expand}`}
                  >
                    <NavDropdown.Item href="#action3">
                              <Nav.Link href="https://mtm-6emn.onrender.com/Home">Home</Nav.Link>

                    </NavDropdown.Item>
                    <NavDropdown.Item href="#action4">
                              <Nav.Link href="https://mtm-6emn.onrender.com/Archive">Archive</Nav.Link>

                    </NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item href="#action5">
                              <Nav.Link href="/About">About</Nav.Link>

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
      <Nav.Item>
        <Nav.Link href="/Home">Home</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link href="/Archive">Archive</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link href="/About">About</Nav.Link>
      </Nav.Item>
      {/*  */}
    </Nav>
        {/* <Nav justify variant="tabs" defaultActiveKey="/home">
      <Nav.Item>
        <Nav.Link  href="/home">Home</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link href="/Archive">Archive</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link href="/About">About</Nav.Link>
      </Nav.Item>
    </Nav> */}
    </div>
      
      </header>
      </div>
  );
}