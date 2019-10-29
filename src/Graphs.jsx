import React, { Component, useState} from 'react';

import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import {XYPlot, XAxis, YAxis, VerticalGridLines, HorizontalGridLines, LineSeries} from 'react-vis'

import * as Data from './data.js';

import Page from './Page.jsx'
import MyDropDown from './MyDropDown.jsx'
import { PageHeader} from './WelcomeHeader.jsx'

import './styles.css'

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));

const Graphs = () => 
{
	const [symbol, setSymbol] = useState("");
	const [subreddit, setSubreddit] = useState("");
	const [timePeriod, setTimePeriod] = useState("");
	const [loading, setLoading] = useState(false);
	const [graphData, setGraphData] = useState(Data.graphDataInit);
	
	const classes = useStyles();

	function sendQuery() 
	{
		console.log("ASDFASDFASDF")
		if(symbol === ""){
			setSymbol("All Symbols")
		}
		if(subreddit === ""){
			setSubreddit("All Subreddits")
		}
		if(timePeriod === ""){
			setTimePeriod("Last Week")
		}

		setLoading(true);

		// fetch(Data.database_endpoint, {
	 //        method: 'POST', // *GET, POST, PUT, DELETE, etc.
	 //        headers:{
	 //        	'subreddit' : subreddit,
	 //        	'timePeriod' : timePeriod,
	 //        	'symbol' : symbol
	 //        }
   
	 //    })
		//   .then(function(response) {
		//     return response.json();
		//   })
		//   .then(function(myJson) {
		//     console.log(JSON.stringify(myJson));
		//   })
		//   .catch(function(error){
		//   	console.log(error);
		//   });

		setLoading(false);
	}

	return (
		<Page>
		    <div style={{textAlign: "center", background:'#fff'}}>
		      <PageHeader text={Data.navbar_items[0][0]}/>
			  <div style={{height:30}}/>
			  <Grid container spacing={0}>
		        <Grid item xs={12}>
			        <MyDropDown items={Data.symbols} 
				      flavorText={"Symbol:"} 
				      formControl={classes.formControl} 
				      setItem={setSymbol}/>
			        <span> &nbsp; &nbsp; </span>
			        <MyDropDown items={Data.subreddits} 
				      flavorText={"Subreddit:"} 
				      formControl={classes.formControl} 
				      setItem={setSubreddit}/> 
				    <span> &nbsp; &nbsp; </span>
				    <MyDropDown items={Data.timeperioditems} 
				      flavorText={"Time Period:"} 
				      formControl={classes.formControl} 
				      setItem={setTimePeriod}/> 
		
			      	<div style={{height:10}}/>
			        <div style={{height:100}}>
			      		<Button type="button" color="primary" onClick={sendQuery}>
			      			<h2>Search</h2>
			      		</Button>
					</div>

		        </Grid>
		       </Grid>
		       <div style={{display:'flex', flexDirection:'column', alignItems:"center", justifyContent:"center"}}>
			        <XYPlot
	                width={Data.chartWidth}
	                height={Data.chartHeight}>
		                <VerticalGridLines />
		                <HorizontalGridLines />
		                <XAxis />
		                <YAxis />
		                <LineSeries
		                    data={graphData}/>
	            	</XYPlot>
	            	<div style={{height:100}}/>
            	</div>
			</div>
		</Page>
	);
}

export default Graphs