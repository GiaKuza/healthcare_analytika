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



    return (
        <div className="chart-container">
            {lineChart}
        </div>
    )
}

export default CovidChart;