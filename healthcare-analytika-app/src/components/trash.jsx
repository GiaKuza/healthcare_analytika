import './app.css'

import React, {useState, useEffect} from 'react'
import LoginPage from './loginpage/LoginPage';
import {Switch, Route, Redirect} from 'react-router-dom';
import Personal from './personal/Personal';
import NotFound from './notfound/NotFound';
import jwt_decode from 'jwt-decode';

const App = () => {
    const [user, setUser] = useState({})

    const jwt = localStorage.getItem('token');
    let decoded = '';
    try{
       decoded = jwt_decode(jwt);
       console.log(decoded)
       setUser(decoded)
       
    } catch(ex) {
      console.log(ex); 
    } 


    const [Auth, setAuth] = useState(false);

     return(
         <div >
            
            <Switch>
                <Route path = "/Login" render= {(props) => <LoginPage {...props} setAuth={setAuth} />} />
                {console.log(Auth)}
                    
                <Route path = "/personal" render = {(props) => Auth ? <Personal {...props}/> : <Redirect to ="./not-found" />} />
                <Route path = "./not-found" component = {NotFound} />
                <Redirect to= "/not-found" />

 
            </Switch>
        
         </div>
         
     )
 }