import React, {useState, useEffect} from 'react';
import axios from 'axios';
import Form from "react-bootstrap/Form";
import logo from './Logo.png'
import {Link} from 'react-router-dom';


import { Container, Row, Col, Jumbotron, Card, CardBody } from "reactstrap";

import "bootstrap/dist/css/bootstrap.min.css";
import "./styles.css";



function Register(props) {
    const username = useFormInput('');
    const useremail = useFormInput('');
    const userpassword = useFormInput('');
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    

    const [token, setToken] = useState(null);
    
    const register = async() => {
        const newUser = { 
            name: username.value,    
            email: useremail.value,
            password: userpassword.value };

            console.log(newUser)

        const response =  await axios.post("http://localhost:5000/api/auth/register/newUser", newUser);


        localStorage.setItem('token', response.headers['x-auth-token']);
        const tokenFromStorage = localStorage.getItem('token') ;

        setToken(tokenFromStorage);
        if(token != null ){
            console.log("token is not nul", token)
           props.setAuth(true);
        }    
  
    }

    useEffect(() => {
     
        console.log(" registeruseEffect")
      
        
        if (token ){
            console.log("register history push")
            props.setAuth(true);
            props.history.push('/personal');
            }
            else {
                console.log("failed")
               //alert("failed login! try again")
                props.history.push('/register');
            }
      }, [token]);

   //------

  
    
    return (
        <div className="box">

                <div className="App">
                
               
      <Container>
         
        <Row>
          
            
            
              <Card>
                <CardBody>
                <img src={logo} className="register-logo"/>
                <br/>
                <h3 color="white">
                Registration

              </h3>
              <hr/>
              
            <Form >
               
                <label for="name">Name</label> <br/>
                <input type="text" {...username} autoComplete="new-username" />
                
                <div >
                    <label >Email Address</label> <br/>
                    <input type="text" {...useremail} autoComplete="new-email" />
                </div>
                <div>
                    <label >Password</label> <br/>
                    <input type="password" {...userpassword} autoComplete="new-password" />
                </div>

                {error && <><small style={{ color: 'red' }}>{error}</small><br /></>}
        
            <input type="button" className="submit-button" value={loading ? 'Loading...' : 'Register'} onClick={ register} disabled={loading} />
            <div class="container signin">
            <p >Already have an account? &nbsp;
            <Link to="/login"><a >Log in</a>. </Link></p>
            </div> 
           

               
                
            </Form>
            </CardBody>
              </Card>
           
          
        </Row>
      </Container>
    </div>
        </div>
    )
}
const useFormInput = initialValue => {
    const [value, setValue] = useState(initialValue);
  
    const handleChange = e => {
      setValue(e.target.value);
    }
    return {
      value,
      onChange: handleChange
    }
  }

  export default Register;