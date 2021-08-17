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



 ------patients return return (
    <>
    {(data.length > 0) ?
    <table className='table table-hover'>
    <thead className='thead-dark'>
        <tr>
            <th scope='col'>First Name </th>
            <th scope='col'>Last Name </th>
            <th scope='col'>Age </th>
            <th scope='col'>Gender </th>
            <th scope='col'>SSN</th>
            <th scope='col'>Essential</th>
            <th scope='col'>Disable</th>
        </tr>
    </thead>
    <tbody>
      {
        data.map(item => (
            
            <tr key={item._id}>
                <td>{item.firstName}</td>
                <td>{item.lastName}</td>
                <td>{item.age}</td>
                <td>{item.gender}</td>
                <td>{item.ssn}</td>
                <td>{item.essentialWorker.toString()}</td>
                <td>{item.disable.toString()}</td>
             </tr>
        ))
      }
    </tbody>
</table>
 :<h3>Loading Patient's Data</h3>
}



</>


)

}

export default PatientPage;

------
import React, {useState, useEffect} from 'react';
import axios from 'axios';
import './Twilio.css'


    function Twilio(props){
        const [text, setText] = useState("");
        const [recipient, setRecipient] = useState("");
        const jwt = localStorage.getItem('token');

        
            const sendText = async() =>{
            try{
                const response =  await axios.get(`http://localhost:5000/api/twilio/send-text?recipient=${recipient}&text=${text}`, { headers: {'x-auth-token': jwt} });
            console.log(response);
            }catch(e){
                console.log(e)
            }
        }
        const spacer = {
            margin: 8
        }
        const textArea = {
            borderRadius: 4
        }
       
        return(
           <div style={{marginTop: 10}}>
               <h2>Send Text Message</h2>
               <label>Your Phone Number</label>
               <br/>
               <input value = {recipient}
               onChange = { e => setRecipient(e.target.value)} />
               <div style={spacer} />
               <label>Message </label>
               <br/>
               <textarea rows={3} value = {text} style={textArea}
               onChange = { e => setText(e.target.value)} />
               <div style = {spacer} />
               <button onClick={sendText} >Send Text</button>


           </div>
        );
    }


export default Twilio;

----------------
import React, {useState, useEffect} from 'react';
import axios from 'axios';
import Form from "react-bootstrap/Form";
import logo from './Logo.png'

import './registerPage.css'



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
        <>
            <div className="logo-container" > <img src={logo} className="logo"/> </div>
           
            <Form className='form-div'>
                <div className="input-div">
                <div className='register-div'>
                <label for="name">Name</label>
                <input type="text" {...username} autoComplete="new-username" />
                </div>
                <div >
                    <label >Email address</label>
                    <input type="text" {...useremail} autoComplete="new-email" />
                </div>
                <div>
                    <label >Password</label>
                    <input type="password" {...userpassword} autoComplete="new-password" />
                </div>

                {error && <><small style={{ color: 'red' }}>{error}</small><br /></>}<br />
        
            <input type="button" className="submit-button" value={loading ? 'Loading...' : 'Register'} onClick={ register} disabled={loading} /> 
           

               
                </div>
            </Form>
        </>
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


  ------
//recovered CArd
<Grid item component={Card}className={cx( "cards-recovered")}>
                    <CardContent>
                        <Typography color="textSecondary" gutterBottom> Recovered </Typography>
                        <CountUp 
                        start={0}
                        end={recovered.value}
                        duration={2.5}
                        separator=","
                        />
                        <Typography color="textSecondary">{new Date(lastUpdate).toDateString()}</Typography>
                        <Typography variant="body2">Number of Recoveries from Covid-19</Typography>
                    </CardContent>
                </Grid>

