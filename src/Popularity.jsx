import React, { Component, useState,Fragment} from 'react';

import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import {XYPlot, XAxis, YAxis, VerticalGridLines, HorizontalGridLines, LineSeries, LineSeriesCanvas} from 'react-vis'

import * as Data from './data.js';

import Page from './Page.jsx'
import MyDropDown from './MyDropDown.jsx'
import MyTextField from './MyLineEdit.jsx'
import { PageHeader} from './WelcomeHeader.jsx'
import  genGraphPage from './GraphBase.jsx'

import './styles.css'


function genQuery(subreddit)
{
	return Data.poplularity_endpoint + 
					"?subreddit_name=" + subreddit
}


const Popularity = () => 
{
	const [subreddit, setSubreddit] = useState("wallstreetbets")
	const [symbol, setSymbol] = useState("AAPL");
	const [startTime, setStartTime] = useState("2018-12-12");
	const [timePeriod, setTimePeriod] = useState("");
	const [endTime, setEndTime] = useState("2019-12-12");
	const [loading, setLoading] = useState(false);
	const [nodata, setNodata] = useState(false);
	const [graphData1, setGraphData1] = useState(Data.graphDataInit);
	const [graphData2, setGraphData2] = useState(Data.graphDataInit);
	
	const classes = Data.useStyles();

	function sendQuery() 
	{
		console.log("called")
		if(symbol === ""){
			setSymbol("All Symbols")
		}
		if(timePeriod === ""){
			setTimePeriod("Last Week")
		}

		setLoading(true);

		var endpoint = genQuery(subreddit);
		console.log (endpoint);
		fetch(endpoint)
		  .then(function(response) {
		    return response.json();
		  })
		  .then(function(myJson) {
		  	setNodata(true)
		    console.log(JSON.stringify(myJson));

		    setGraphData1(JSON.stringify(myJson["res"]));

		  })
		  .catch(function(error){
		  	console.log(error);
		  });
		  
		setLoading(false);
	}

	
	var datePlaceholder = "YYYY-MM-DD"

	const searchArea =
				<div>
			        <MyTextField name={"Subreddit"} defaultValue={subreddit} onChange={(e)=> setSubreddit(e.target.value)}/>
			        <span> &nbsp; &nbsp; </span>
				</div>
				;
		
	const genres = () => 
	<div> 
		graphData1
	</div>

	return ( 
		<Page>
		    <div style={{textAlign: "center", background:'#fff', opacity:.7}}>
		      <PageHeader text={Data.navbar_items[3][0]}/>
			  <div style={{height:30}}/>
			  <Grid container spacing={0}>
		        <Grid item xs={12}>
		        {searchArea}
			      	<div style={{height:10}}/>
			        <div style={{height:100}}>
			      		<Button type="button" color="primary" onClick={() => sendQuery()}>
			      			<h2>Search</h2>
			      		</Button>
					</div>

		        </Grid>
		       </Grid>
		       <div style={{color:'black', display:'flex', flexDirection:'column', alignItems:"center", justifyContent:"center"}}>
			        {
			        	JSON.stringify(graphData1)
					}
	            	<div style={{height:90}}/>
            	</div>
            </div>
    	</Page>
    )
}

export default Popularity