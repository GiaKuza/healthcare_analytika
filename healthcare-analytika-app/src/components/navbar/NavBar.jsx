import React, { useEffect, useState } from 'react';
import { withRouter, Switch, Route, Link } from 'react-router-dom';
import {Container,Navbar,Nav,NavItem, FormControl, Form, Button } from 'react-bootstrap';
import logo from './Logo.png'

import LoginPage from '../loginpage/LoginPage';
import PatientPage from '../patientspage/patientsPage';
import './NavBar.css';

const  NavBar = (props) => {


    return (

        


        <div>
        <div>
          <Navbar className="color-nav" variant="light">
            <Navbar.Brand as={Link}  to="/personal" ><img src={logo} className="navbar-logo"></img></Navbar.Brand>
            <Navbar.Collapse>
              <Nav className="mr-auto">
                <NavItem eventkey={1} href="/">
                  <Nav.Link as={Link} to="/personal" >Personal</Nav.Link>
                </NavItem>
                <NavItem eventkey={2} href="/patients">
                  <Nav.Link as={Link} to="/patients" >Patients</Nav.Link>
                </NavItem>
                <NavItem eventkey={3} href="/data">
                  <Nav.Link as={Link} to="/data" >Data</Nav.Link>
                </NavItem>
                <NavItem eventkey={3} href="/covid-tracker">
                  <Nav.Link as={Link} to="/covid-tracker" >Covid19 Tracker</Nav.Link>
                </NavItem>
                
              </Nav>
           
            </Navbar.Collapse>
            <Nav pullRight style={{paddingRight:20}}>
                    <NavItem eventKey={4} href="/login">
                    <Nav.Link as={Link} to="/login" >Log out</Nav.Link>
                </NavItem>
                </Nav>
          </Navbar>
        </div>
        <div>
        
        </div>
    

      </div>
    );
}

export default withRouter(NavBar);