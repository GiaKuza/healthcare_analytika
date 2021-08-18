import React, {useState, useEffect} from 'react';
import Cards from '../cards/Cards';
import CountryPicker from '../countryPicker/CountryPicker';
import CovidChart from './CovidChart';
import NavBar from '../navbar/NavBar'
import axios from 'axios';

import './CovidPage.css';

const CovidPage = () => {

    //const url = 'https://covid19.mathdro.id/api';
    const [url, setUrl] = useState('https://covid19.mathdro.id/api')
    const fetchData = async () => {

    }
    const [data, setData] = useState({})

    useEffect(() => {
        const getData = async(country) =>{
            console.log(country)
            let changeableUrl = url;
            if(country != null){
                changeableUrl = `${url}/countries/${country}`;
                console.log("changeableURL", changeableUrl)
                
            }
            console.log("notChangeableURL", changeableUrl)

            try{
                console.log("URL:",url)
                const response =  await axios.get(url);
               // console.log(response.data)
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
        getData(selectedCountry)
        }, [url]);


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

            const [countries, setCountries] = useState([])
            const [selectedCountry, setSelectedCountry] = useState(null)

        useEffect(() => {
            const getCountries = async() =>{
                try{
                    const response =  await axios.get('https://covid19.mathdro.id/api/countries');
                    console.log(response.data)
                   setCountries(response.data.countries) 
                    
                }catch (error){
                    console.log(error)
                }
            
            };
            getCountries()
            }, []);
    

        data ? console.log(data): console.log("no data yet");
        
        const handleCountryChange = async(country) =>{
            setSelectedCountry (country)
          
            console.log(selectedCountry)
            console.log("daata",data)
        }
       

    return (

        <div>
            <NavBar/>

        <div className="covid-container">
           
            <Cards data = {data}/>
            <br/>
            {countries.length > 0 ? 
            <CountryPicker countries={countries} setSelectedCountry={handleCountryChange} setUrl={setUrl} /> : console.log("loading countries")}
            {selectedCountry ? console.log(selectedCountry): console.log("not seleceted")}
            <CovidChart dailyData = {dailyData} data={data} selectedCountry={selectedCountry}/>
           
        </div>
        </div>
    )
}

export default CovidPage;