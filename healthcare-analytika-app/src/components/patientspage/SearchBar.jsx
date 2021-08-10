import React from 'react';
import './SearchBar.css'



    function SearchBar(props){
        return(
            <form>
                <label htmlFor="header-search">
                    <span className="visually-hidden">Find a patient</span>
                </label>
                <input
                    type="text"
                    id="header-search"
                    placeholder="Find artists, albums and more"
                    name="s"
                    onChange={props.handleChange}
                />
                <button type="submit">Search</button>
            </form>
        );
    }


export default SearchBar;