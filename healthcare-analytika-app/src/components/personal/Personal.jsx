import './Personal.css'
import React, {useState, useEffect} from 'react';
import logo from './avatar.png'
import axios from 'axios';
import jwt_decode from 'jwt-decode';
import NavBar from '../navbar/NavBar'
import { Switch, Route } from 'react-router-dom';
import PatientPage from '../patientspage/patientsPage'
import ImageUpload from './ImageUpload'
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';

function Personal(props) {

    const [user, setUser] = useState([]);
    const [userData, setUserData] = useState([]);
    const [data, setData] = useState({})
    const [profilePhoto, setProfilePhoto] = useState("");
    const [uploadedImage, setUploadedImage] = useState("")
    const [ fileName, setFileName] = useState(null)

    const jwt = localStorage.getItem('token');
    props.setAuth(true);

    useEffect(() => {
        const getData = async() =>{
        const response =  await axios.get('http://localhost:5000/api/collections/user/userInfo', { headers: {'x-auth-token': jwt} });
        setData(response.data);
    };
    getData()
      }, []);
    
      const fileSelectedHandler = (event) => {
          event.preventDefault()
          //console.log(event.target.files[0].name)
          setProfilePhoto(event.target.files[0]);
          setFileName(event.target.files[0].name)
      }
      
      
      const fileUploadHandler = async() => {
          const FormData = require('form-data')
          const fd = new FormData();
          fd.append('file', profilePhoto)
          //console.log(profilePhoto)
          //console.log(fd.get('file'))
        // await setFileName(fd.get('file').name)
         // console.log("this file name image", fileName)

        try{
        const response =  await axios.post('http://localhost:5000/api/collections/user/upload', fd, {  headers: {
            'x-auth-token': jwt,
            'Content-Type': 'multipart/form-data'} });
            //return response;
        
        }catch(err){
            if(err.response.status == 500){
                
                console.log('There was a problem with the server', err.response)
            } else{
                console.log("other error")
            }
        }  
       

    }
  

  

      
            //console.log(props.userData)
            return (
                <div >
                
                {data ?
                    
                
                    <div>
                    <NavBar/>
                    
                

                    <div className="App-profile">
                        <h1 className="Users-Name">Welcome {data.name}!</h1>
                        {!fileName ?
                        
                        <img className="profile-image"src={require('./avatar.png').default} alt="profile-pic" width="250" height="250" border-radius="50%"></img>
                        :  
                        <img className="profile-image"src={ require(`./uploads/${fileName}`).default} alt="profile-pic" width="300" height="300" border-radius="50%"></img>}
                        <div className="form-inline">
                        <input className="form-control mr-1" type ="file" onChange ={fileSelectedHandler} id="upload"/>
                      
                        <button className="btn btn-primary btn-block mt-4-profile" onClick={fileUploadHandler}>Update Profile Image</button>
                        </div>
                        


                            
                        </div>
                        <Form className="profile-form">
                        <FormGroup>
                            <Label for="email">Email</Label>
                            <Input type="text" name="email" id="exampleEmail" placeholder={data.email} />
                        </FormGroup>
                        <FormGroup>
                            <Label for="address">Address</Label>
                            <Input type="text" name="password" id="examplePassword" placeholder={data.address} />
                        </FormGroup>
                        <FormGroup>
                            <Label for="examplePassword">Phone</Label>
                            <Input type="text" name="password" id="examplePassword" placeholder={data.phone} />
                        </FormGroup>
                       </Form> 
                    </div>
                    :<h3>No User Data</h3>
                    }

                    
        
                    </div>
        
    )
    
}

export default Personal;