import React, {useState, useEffect} from 'react';
import {NativeSelect, FormControl} from '@material-ui/core'
import './CountryPicker.css';

const CountryPicker = (props) => {
   // console.log(props)
    //const [countries, setcountries] = useState([]);
    let countries = []
    if(props.countries.length > 0){
     countries = props.countries.map((country) => country.name);
   // console.log(countries);
    }
    //console.log(countries)
    
    return (
        <FormControl className = "formControl">
            <NativeSelect defaultValue="" onChange={(e) => {
            props.setUrl(`https://covid19.mathdro.id/api/countries/${e.target.value}`)
             props.setSelectedCountry(e.target.value)
            }
             
             }>

                
                <option value="global">Global</option>
                {countries.map((country,i) => <option key={i} value={country}>{country}</option>)}
            </NativeSelect>
        </FormControl>
    )
}

export default CountryPicker;