import './app.css'

import React, {useState, useEffect} from 'react'
import LoginPage from './loginpage/LoginPage';
import {Switch, Route, Redirect} from 'react-router-dom';
import Personal from './personal/Personal';
import NotFound from './notfound/NotFound';
import PatientPage from './patientspage/patientsPage';
import jwt_decode from 'jwt-decode';

const App = () => {
    const [user, setUser] = useState({})

   

    const [Auth, setAuth] = useState(false);
    

     return(
         <div >
            
            
            <Switch>
                <Route exact path={"/"} component={LoginPage} />
                <Route path = "/Login" render= {(props) => <LoginPage {...props} setAuth={setAuth} />} />
                {console.log(Auth)}
                    
                <Route path = "/personal" render = {(props) => Auth ? <Personal {...props} setAuth={setAuth}/> : <Redirect to ="./not-found" />} />
                <Route path = "/patients" render = {(props) =>  <PatientPage {...props} />} />
                <Route path = "/not-found" component = {NotFound} />
                <Redirect to= "/not-found" />

 
            </Switch>
        
         </div>
         
     )
 }

 export default App