import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import React, { useState,useEffect } from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';


import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import charts from './assets/charts.jpg'
import laptop from './assets/laptop.jpg'
import messages from  './assets/messages.jpg'
import logo from './assets/Logo.png'
import './LoginPage.css'




function LoginPage(props) {
    const useremail = useFormInput('');
    const userpassword = useFormInput('');
    //const [Auth, setAuth] = useState(false);
    const [token, setToken] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    

    const login = async() => {
        console.log ("clicked login button")
        const credentials = { email: useremail.value,
                              password: userpassword.value };

        console.log(useremail)
        const response =  await axios.post("http://localhost:5000/api/auth/login/", credentials);
        localStorage.setItem('token', response.headers['x-auth-token']);
        const tokenFromStorage = localStorage.getItem('token') ;

        setToken(tokenFromStorage);
        if(token != null ){
            console.log("token is not nul", token)
            
           props.setAuth(true);
        }    
  
    }
            
    useEffect(() => {
     
        console.log("useEffect")
      
        
        if (token ){
            console.log("history push")
            props.setAuth(true);
            props.history.push('/personal');
            }
            else {
                console.log("failed")
               //alert("failed login! try again")
                props.history.push('/login');
            }
      }, [token]);

      const register = () => {
          console.log("clicker register")
      }
    return (
        <>  
           <div className="logo-container"> <img src={logo} className="logo"/> </div>
            <Form className="login-form" >
                
                
                <br/>
                <br/>
            <h3 className="center"> Welcome </h3>
                <FormGroup>
                    <Label>Email: </Label>
                     <Input type="email" {...useremail} placeholder="Email"/>
                </FormGroup>
                <br/>
                <FormGroup>
                    <Label>Password: </Label>
                     <Input type="password" {...userpassword} placeholder="Password"/>
                </FormGroup>
                
                {error && <><small style={{ color: 'red' }}>{error}</small><br /></>}<br />
                <Button className = "btn-lg btn-block" color="secondary" value={loading ? 'Loading...' : 'Login'} onClick={ login} disabled={loading}> Log in </Button>
                <br/>
                <br/>
                <p style={{display:"inline-block"}}>   Dont have an account? &nbsp;</p>
                <Link to="/register">
                <button className = "btn-sm btn-block " color="secondary" onClick={register} > Sign up </button>
                </Link>
            </Form>
            <div className = "carousel">
              
                <Carousel 
                showStatus={false}
                infiniteLoop 
                autoPlay 
                showIndicators={false} 
                showThumbs={false} 
                interval={2000}
                fade
                showArrows={false}
                centerSlidePercentage={50}
                centerMode={true}
                axis={'vertical'}
                transitionTime={300}
               
                
                
                
                >
                <div >
                    <img alt="" src={laptop} />
                    <p className="carousel-caption">Central Database Management Interface</p>
                </div>
                <div>
                    <img alt="" src={charts} />
                    <p className="carousel-caption">Real-Time Data Visualization</p>
                </div>
                <div>
                    <img alt="" src={messages} />
                    <p className="carousel-caption">Connect with patients via SMS</p>
                </div>
                </Carousel>

            </div>
    

        </>
    );
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
    export default LoginPage;
  
  