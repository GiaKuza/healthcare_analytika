
import React, {useState, useEffect} from 'react';
import axios from 'axios';
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import {Modal, Button} from "react-bootstrap";

import "bootstrap/dist/css/bootstrap.min.css";
import "react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";


function PatientPage(props) {
    const jwt = localStorage.getItem('token');
    const [data, setData] = useState({})
    const [modalInfo, setModalInfo] = useState([]);
    const [showModal, setShowModal] = useState(false);

    const [show, setShow]= useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
   
   useEffect(() => {
    const getData = async() =>{
    const response =  await axios.get('http://localhost:5000/api/collections/patients/allRecords', { headers: {'x-auth-token': jwt} });
    setData(response.data);
};
getData()
  }, []);
        console.log(data)

        const columnns = [
            {dataField: "firstName", text: "First Name"},
            {dataField: "lastName", text: "Last Name"},
            {dataField: "age", text: "Age"},
            {dataField: "gender", text: "Gender"},
          
        ]

        const rowEvents = {
            onClick: (e,row) => {
                console.log(row);
                setModalInfo(row)
                toggleTrueFalse()
            }
        }

        const toggleTrueFalse = () => {
            setShowModal(handleShow);
        }

        const ModalContent = () => {
            return(
                <Modal show={show} onHide={handleClose}>
                    <Modal.Header >
                        <Modal.Title>{modalInfo.lastName}, {modalInfo.firstName} </Modal.Title>
                    </Modal.Header>
                        <Modal.Body>
                        <h2>Patient Details</h2>
                        <ul>
                            <ol>SSN: {modalInfo.ssn}</ol>
                            <ol>Essential Worker: {modalInfo.essentialWorker.toString()}</ol>
                            <ol>Disabilities: {modalInfo.disable.toString()}</ol>
                            <ol>Covid Vaccine: {modalInfo.vaccine.covid.toString()}</ol>
                            <ol>Flu Vaccine: {modalInfo.vaccine.flu.toString()}</ol>
                            <ol>Varicella Vaccine: {modalInfo.vaccine.varicella.toString()}</ol>
                            <ol>Tetanus Vaccine: {modalInfo.vaccine.tetanus.toString()}</ol>
                        </ul>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={handleClose}>Close</Button>
                        </Modal.Footer>
                </Modal>
            )
        }


            return (
                <>
                {(data.length > 0) ?
                
                <BootstrapTable 
                keyField = "name"
                data = {data}
                columns = {columnns}
                pagination = {paginationFactory()}
                rowEvents = {rowEvents}
                />
                
             :<h3>Loading Patient's Data</h3>
            }
            {show ? <ModalContent /> : null}
        

            </>
       
        
    )
    
}

export default PatientPage;