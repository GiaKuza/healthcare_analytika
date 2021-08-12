import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {Modal, Button} from "react-bootstrap";
import './Twilio.css'


    function Twilio(props){
        
    const [modalInfo, setModalInfo] = useState([]);
    const [showModal, setShowModal] = useState(false);

    const [show, setShow]= useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


        const [text, setText] = useState("");
        let mytext= React.createRef();
        let myrecipient = React.createRef();
        let input = React.createRef();
        const [recipient, setRecipient] = useState("");
        const jwt = localStorage.getItem('token');

        
            const sendText = async() =>{


            try{
                const response =  await axios.get(`http://localhost:5000/api/twilio/send-text?recipient=${myrecipient}&text=${mytext}`, { headers: {'x-auth-token': jwt} });
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

        const toggleTrueFalse = () => {
            setShowModal(handleShow);
        }

      
        

        const onChangeText = (event) => {
            console.log("Text state changed")
            event.preventDefault()
            //setText(event.target.value);
            mytext = event.target.value
        }
        const onChangeRecipient= (event) => {
            console.log("Recepient state changed")
            event.preventDefault()
            //setRecipient(event.target.value);
            myrecipient = event.target.value;
        }

        const handleSubmit = (event) => {
            event.preventDefault();
           sendText();
           alert("message sent!")
           document.getElementById("create-form").reset();
           
           

        }
     

       
        const ModalContent = () => {
            return(
                <Modal show={show} onHide={handleClose }>
                    <Modal.Header >
                        <Modal.Title>Send a text message</Modal.Title>
                    </Modal.Header>
                        <Modal.Body>

                            <form  id="create-form" onSubmit={handleSubmit} >
                                <label>Your Phone Number</label>
                                <br/>
                                <input type="text" onChange={onChangeRecipient}  ref = {myrecipient} />
                                <br/>
                                <label>Message </label>
                                <br/>
                                <textarea rows={3} ref = {mytext} onChange={onChangeText} style={textArea} />
                                <input type="submit" value="Submit" />
                            </form>

                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={handleClose}>Close</Button>
                        </Modal.Footer>
                </Modal>
            )
        }

        return(
            <div className="App">
                    
                    <button 
                    className="openModalBtn"
                    onClick={toggleTrueFalse}
                    >Send a Text Message</button>
                     {show ? <ModalContent /> : null}

            </div>
        );
    }


export default Twilio;