import React, { useEffect, useState } from 'react';
import { withRouter, Switch, Route, Link } from 'react-router-dom';
import {Container,Navbar,Nav,NavItem, FormControl, Form, Button } from 'react-bootstrap';

import LoginPage from '../loginpage/LoginPage';
import PatientPage from '../patientspage/patientsPage';
import './NavBar.css';

const  NavBar = (props) => {


    return (

        


        <div>
        <div>
          <Navbar>
            <Navbar.Brand as={Link} to="/personal" >Healthcare Analytika</Navbar.Brand>
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
              </Nav>
            </Navbar.Collapse>
          </Navbar>
        </div>
        <div>
        
        </div>
    

      </div>
    );
}

export default withRouter(NavBar);