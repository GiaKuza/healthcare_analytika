import React, {useState, useEffect} from 'react';
import Cards from '../cards/Cards';
import CountryPicker from '../countryPicker/CountryPicker';
import CovidChart from './CovidChart';
import NavBar from '../navbar/NavBar'
import axios from 'axios';

import './CovidPage.css';

const CovidPage = () => {

    const url = 'https://covid19.mathdro.id/api';
    const fetchData = async () => {

    }
    const [data, setData] = useState({})

    useEffect(() => {
        const getData = async() =>{
            try{
                const response =  await axios.get('https://covid19.mathdro.id/api');
                console.log(response.data)
                setData({
                    confirmed: response.data.confirmed,
                    recovered: response.data.recovered,
                    deaths: response.data.deaths,
                    lastUpdate: response.data.lastUpdate
                })
                
            }catch (error){
                console.log(error)
            }
        
        };
        getData()
        }, []);


        const [dailyData, setDailyData] = useState([])

        useEffect(() => {
            const getDailyData = async() =>{
                try{
                    const response =  await axios.get('https://covid19.mathdro.id/api/daily');
                    console.log(response.data)
                     setDailyData(response.data) 
                    
                }catch (error){
                    console.log(error)
                }
            
            };
            getDailyData()
            }, []);
    

        data ? console.log(data): console.log("no data yet");
        
       

    return (

        <div>
            <NavBar/>

        <div className="covid-container">
           
            <Cards data = {data}/>
            <br/>
            <CountryPicker />
            <CovidChart dailyData = {dailyData} />
        </div>
        </div>
    )
}

export default CovidPage;