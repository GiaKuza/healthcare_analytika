
import React, {useState, useEffect} from 'react';
import { Chart } from "react-google-charts";
import Histogram from "react-chart-histogram";

import {Bar, Line, Pie} from 'react-chartjs-2';


import NavBar from '../navbar/NavBar'
import './Data.css'



function Data(props) {
    
const [chartData, setChartData] = useState({
    labels:['Covid', 'flu', 'varicella', 'tetanus'],
    datasets:[{
        label:'Number of Vaccinated Patients',
        data: [950, 500, 100, 300],
        backgroundColor: [
            'rgba(255, 99, 132, 0.6)',
            'rgba(54, 162, 235, 0.6)',
            'rgba(255, 206, 86, 0.6)',
            'rgba(75, 192, 192, 0.6)']

    }
    ]
})

            return (
                <>
                    <NavBar/>
                    <h3 >Vaccines: Supply Availability</h3>
                    <div className='chart'>
                    <Bar 
                        data={chartData}
                        options={{
                         title: {
                             display: true,
                             text: 'Current Patient Vaccine Status at Local Hospital',
                             fontSize: 25
                         },
                         legend:{
                             display:true,
                             position:'right'
                         }
                        }}
                     
                    />
                    </div>
  
                    
                        
                </>
       
        
    )
    
}

export default Data;