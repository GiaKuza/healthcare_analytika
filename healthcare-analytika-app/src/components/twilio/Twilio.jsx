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

        const toggleTrueFalse = () => {
            setShowModal(handleShow);
        }

      
        

        const onChangeText = (event) => {
            console.log("Text state changed")
            event.preventDefault()
            setText(event.target.value);
            //text2 = event.target.value;
        }
        const onChangeRecipient= (event) => {
            console.log("Recepient state changed")
            event.preventDefault()
            setRecipient(event.target.value);
        }
       
        const ModalContent = () => {
            return(
                <Modal show={show} onHide={handleClose}>
                    <Modal.Header >
                        <Modal.Title>Send a text message</Modal.Title>
                    </Modal.Header>
                        <Modal.Body>
                        <div style={{marginTop: 10}}>
                       
                         <label>Your Phone Number</label>
                         <br/>
                            <input value = {recipient}
                            onChange = { onChangeRecipient }/>
                        <div style={spacer} />
                        <label>Message </label>
                        <br/>
                        <textarea rows={3} value = {text} style={textArea}
                         onChange = { onChangeText} />
                            <div style = {spacer} />
                        <button onClick={sendText} >Send Text</button>
                        </div>
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