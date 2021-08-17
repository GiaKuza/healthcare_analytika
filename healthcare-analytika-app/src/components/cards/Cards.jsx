import React from 'react';
import {Card, CardContent, Typography, Grid, StylesProvider} from '@material-ui/core';
import CountUp from 'react-countup'
import cx from 'classnames';
import './Cards.css'

const Cards = ( {data: {confirmed, recovered, deaths, lastUpdate} } ) => {
    if(!confirmed){
        return 'Loading...'
    }
    //console.log(props)
    return (
        <div className="cards-container">
            <Grid container spacing={4}    justify="center" wrap="nowrap" style={{height:"120px", padding:"0px"}}>
                <Grid item  component={Card}  className={cx( "cards-infected")}>
                    <CardContent>
                        <Typography color="textSecondary" gutterBottom> Number of Infected Cases </Typography>
                        <CountUp 
                        start={0}
                        end={confirmed.value}
                        duration={2.5}
                        separator=","
                        />
                        <Typography color="textSecondary"> {new Date(lastUpdate).toDateString()}</Typography>
                        
                    </CardContent>
                </Grid>
                
                <Grid item  component={Card}   className={cx( "cards-deaths")}>
                    <CardContent>
                        <Typography color="textSecondary" gutterBottom> Number of Deaths </Typography>
                        <CountUp 
                        start={0}
                        end={deaths.value}
                        duration={2.5}
                        separator=","
                        />
                        <Typography color="textSecondary">{new Date(lastUpdate).toDateString()}</Typography>
                        
                    </CardContent>
                </Grid>

            </Grid>
        
        
        
        </div>
    )
}

export default Cards;