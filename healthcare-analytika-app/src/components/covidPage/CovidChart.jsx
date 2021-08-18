import React from 'react';
import {Line, Bar} from 'react-chartjs-2';
import './CovidChart.css';

const CovidChart = (props) => {

   
    const modifiedData = props.dailyData.map((data) => ({
        confirmed : data.confirmed.total,
        deaths : data.deaths.total,
        date : data.reportDate,
    })) 

    console.log(modifiedData)
 
    const lineChart = (
        modifiedData?
        <Line 

        data={{
            labels: modifiedData.map(({date}) => date),
            datasets: [{
                data:  modifiedData.map(({confirmed}) => confirmed),
                label: "Infected",
                borderColor: '#3333ff',
                fill: true
            }, {
                data:  modifiedData.map(({deaths}) => deaths),
                label: "Deaths",
                borderColor: 'red',
                backgroundColor: 'rgba(255,0,0,0.5)',
                fill: true

            }],
        }}
        /> : null
    );
        console.log('props.data', props.data.confirmed)
    const barChart = (
        props.data.confirmed ? (
           
            <Bar
            data={{
                labels: ['Infected', 'Deaths'],
                datasets: [{
                    label: `Current state in ${props.selectedCountry}`,
                    backgroundColor: [
                        'rgba(0,0,255,0.5)',
                        
                        'rgba(255,0,0,0.5)',
                    ],
                    data: [
                        props.data.confirmed.value, props.data.deaths.value
                    ]
                }]
            }}
            options={{
                legend: {display: false},
                title: {display: false, text:`Current state in ${props.selectedCountry}`},
            }}
            />
        ) : null

        
    );



    return (
        <div className="chart-container">
            {props.selectedCountry ? barChart: lineChart}
            
        </div>
    )
}

export default CovidChart;