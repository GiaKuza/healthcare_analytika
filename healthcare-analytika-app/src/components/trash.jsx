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