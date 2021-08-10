
import React, {useState, useEffect} from 'react';
import axios from 'axios';


function PatientPage(props) {
    const jwt = localStorage.getItem('token');
   // props.setAuth(true);
   const [data, setData] = useState({})
   
   useEffect(() => {
    const getData = async() =>{
    const response =  await axios.get('http://localhost:5000/api/collections/patients/allRecords', { headers: {'x-auth-token': jwt} });
    setData(response.data);
};
getData()
  }, []);
        console.log(data)
   
            //console.log(props.userData)
            return (
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