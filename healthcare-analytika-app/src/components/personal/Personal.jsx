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
    const [ fileName, setFileName] = useState("no photo")

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
          //setData({...data, photo: event.target.files[0].name })
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
       // let [myEmail, setMyEmail] = useState("email");
   
       let myEmail= React.createRef();
        let myPhone = React.createRef();
        let myAddress= React.createRef();
        

        const onChangeEmail = (event) => {
            console.log("email state changed")
            event.preventDefault()
            //setText(event.target.value);
            myEmail = event.target.value
           setData({...data, email: event.target.value});
        }
        const onChangePhone = (event) => {
            console.log("phone state changed")
            event.preventDefault()
            //setRecipient(event.target.value);
            myPhone= event.target.value;
            setData({...data, phone: event.target.value});
        }

        const onChangeAddress = (event) => {
            console.log("address state changed")
            event.preventDefault()
            //setRecipient(event.target.value);
            setData({...data, address: event.target.value});
            
        }

        const handleSubmit = (event) => {
            event.preventDefault();
            console.log(data.phone)
            let updatedInfo = {
                "address": data.address,
                "phone": data.phone,
                "email": data.email,
                "photo": fileName
               
                
            }

            /* if(myAddress){updatedInfo.address = myAddress}
            if(myPhone){updatedInfo.phone = myPhone}
            if(myEmail){updatedInfo.email = myEmail}
            if(fileName){updatedInfo.photo = fileName} */
            console.log(updatedInfo)
           axios.put('http://localhost:5000/api/collections/user/edit', updatedInfo, { headers: {'x-auth-token': jwt} });
           if(fileName !== "no photo"){
               setData({...data, photo: fileName})
           }
        }
  

      
            //console.log(props.userData)
            return (
                <div >
                
                {data.photo ?
                    
                
                    <div>
                        
                    <NavBar/>
                    
                

                    <div className="App-profile">
                        <h1 className="Users-Name">Welcome {data.name}!</h1>
                        {(data.photo == "no photo") ?
                        
                        <img className="profile-image"src={require('./avatar.png').default} alt="profile-pic" width="250" height="250" border-radius="50%"></img>
                        :  
                        <img className="profile-image"src={ require(`./uploads/${data.photo}`).default} alt="profile-pic" width="300" height="300" border-radius="50%"></img>}
                        <div className="form-inline">
                        <input className="form-control mr-1" type ="file" onChange ={fileSelectedHandler} id="upload"/>
                      
                        <button className="btn btn-primary btn-block mt-4-profile" onClick={fileUploadHandler}>Upload an Image</button>
                        </div>
                        


                            
                        </div>
                        <Form className="profile-form" onSubmit={handleSubmit}>
                        <FormGroup>
                            <Label for="email">Email</Label>
                            <Input type="text" name="email" onChange ={onChangeEmail} id="exampleEmail" value={data.email} />
                        </FormGroup>
                        <FormGroup>
                            <Label for="address">Address</Label>
                            <Input type="text" name="address" onChange ={onChangeAddress} id="exampleAddress" value={data.address} />
                        </FormGroup>
                        <FormGroup>
                            <Label for="phone">Phone</Label>
                            <Input type="text" name="phone" onChange ={onChangePhone} id="examplePhone" value={data.phone} />
                            
                        </FormGroup>
                        <button className = "btn btn-primary btn-block mt-5-profile" type="submit" value="Submit" > Update My Info </button>
                       </Form> 
                    </div>
                    :<h3>No User Data</h3>
                    }

                    
        
                    </div>
        
    )
    
}

export default Personal;