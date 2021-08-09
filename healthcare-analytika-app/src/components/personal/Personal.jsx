import './Personal.css'
import React, {useState, useEffect} from 'react';
import logo from './avatar.png'
import axios from 'axios';
import jwt_decode from 'jwt-decode';
import NavBar from '../navbar/NavBar'
import { Switch, Route } from 'react-router-dom';
import PatientPage from '../patientspage/patientsPage'

function Personal(props) {

    const [user, setUser] = useState([]);
    const [userData, setUserData] = useState([]);
    const [data, setData] = useState({})

    const jwt = localStorage.getItem('token');
    props.setAuth(true);
   


    //const response = axios.get('http://localhost:5000/api/collections/user/userInfo', { headers: {'x-auth-token': jwt} })
   // console.log(response.data)
    
    useEffect(() => {
        const getData = async() =>{
        const response =  await axios.get('http://localhost:5000/api/collections/user/userInfo', { headers: {'x-auth-token': jwt} });
        setData(response.data);
    };
    getData()
      }, []);
   
    

      //if(isLoading) { return <div> {console.log(user)} Loading ... </div> }


   
            //console.log(props.userData)
            return (
                <>
                {data ?
                
                    <div>
                    <NavBar/>
            
                   
                
                    <div className="profilePage">
                        <h1 className="Users-Name">{data.name}</h1>
                        <img className="profile-image"src={logo} alt="profile-pic" width="300" height="300" border-radius="50%"></img>
                        <h2 className="bio">{data.address}</h2>
                    <div className="form">
                        <h5 className="name">Name</h5>
                        
                        <h5 className="email" onSubmit="">Email</h5>
            
                    </div>
                    </div>
                    </div>
                    :<h3>No User Data</h3>
                    }

                
        
                    </>
        
    )
    
}

export default Personal;