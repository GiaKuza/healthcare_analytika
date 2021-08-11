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
                <div className ="title"></div>
                <div className="body"></div>
                <div className="footer"></div>
                
            </div>

        </div>
    )
}

export default Modal;