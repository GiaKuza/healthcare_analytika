import {Modal, Button} from "react-bootstrap";
import React from 'react';
import './Modal.css';

function Modal(props){

    const [modalInfo, setModalInfo] = useState([]);
    const [showModal, setShowModal] = useState(false);
  

    const [show, setShow]= useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);



    const spacer = {
        margin: 8
    }
    const textArea = {
        borderRadius: 4
    }
    return(
        <div className="modalBackground">
            <div className="modalContainer">
                <button> X </button>
                <div className ="title"></div>
                <h3>Compose your message</h3>
                <label>Your Phone Number</label>
               <br/>
               <input value = {props.recipient}
               onChange = { e => props.setRecipient(e.target.value)} />
               <div style={spacer} />
               <label>Message </label>
               <br/>
               <textarea rows={3} value = {props.text} style={textArea}
               onChange = { e => props.setText(e.target.value)} />
               <div style = {spacer} />
               <button onClick={props.sendText} >Send Text</button>
                
            </div>

        </div>
    )
}

export default Modal;