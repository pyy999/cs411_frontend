import React, { Component, useState,Fragment} from 'react';

import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import {XYPlot, XAxis, YAxis, VerticalGridLines, HorizontalGridLines, LineSeries, LineSeriesCanvas, VerticalBarSeries} from 'react-vis'

import * as Data from './data.js';

import Page from './Page.jsx'
import MyDropDown from './MyDropDown.jsx'
import MyTextField from './MyLineEdit.jsx'
import { PageHeader} from './WelcomeHeader.jsx'

import './styles.css'


const Keywords = () => 
{
	const [subreddit_name, setSubreddit_name] = useState("wallstreetbets");
	const [startTime, setStartTime] = useState("tesla");
	const [timePeriod, setTimePeriod] = useState("");
	const [loading, setLoading] = useState(false);
	const [nodata, setNodata] = useState(false);
	const [graphData, setGraphData] = useState();

	const [graphData2, setGraphData2] = useState();
	
	const classes = Data.useStyles();


function genQuery()
{
	return Data.keywords_endpoint + 
					"?company=" + startTime+ 
					"&subreddit_name=" + subreddit_name; 
}

	function sendQuery() 
	{
		console.log("called")
		if(subreddit_name === ""){
			setSubreddit_name("All subreddit_names")
		}
		if(timePeriod === ""){
			setTimePeriod("Last Week")
		}

		setLoading(true);

		var endpoint = genQuery();
		console.log (endpoint);
		fetch(endpoint)
		  .then(function(response) {
		    return response.json();
		  })
		  .then(function(myJson) {
		  	setNodata(true)
		    console.log(JSON.stringify(myJson));
		    var data1 = [];
		    myJson["res"].forEach(function(e){
		    	data1.push({x : e["keyword"], y: e["count"]})
		    	setNodata(false)
		    })
	    	setNodata(false)
		    console.log(data1);
		    setGraphData(data1);
		    console.log("asdf")
		  })
		  .catch(function(error){
		  	console.log(error);
		  });
		  
		setLoading(false);
	}

	
	var datePlaceholder = "YYYY-MM-DD"

	const searchArea =
		<div>
	        <MyTextField name={"Subreddit Name"} defaultValue={subreddit_name} onChange={(e)=> setSubreddit_name(e.target.value)}/>
	        <span> &nbsp; &nbsp; </span>
	        <MyTextField name={"Company Name"} defaultValue={startTime} onChange={(e)=> setStartTime(e.target.value)}/>
		</div>
		;
		

	const genlineseries = [graphData]
	

const genbar = () => 
{
	console.log("asdf2")
	if(nodata)
	{
		return (<div>
			<h1 style={{ color: 'black' }}> NO DATA FOUND </h1>
			</div>)
	}

	if(loading)
	{
		return (<div>
				<h1> LOADING </h1>
				</div>)
	}
	return (

			<XYPlot
				xType='ordinal'
                width={Data.chartWidth}
                height={Data.chartHeight}>
                <VerticalGridLines />
                <HorizontalGridLines / >
                <XAxis />
                <YAxis />
                <VerticalBarSeries data={genlineseries[0]} />

        	</XYPlot>)
}


	return (
		<Page>
		    <div style={{textAlign: "center", background:'#fff', opacity:.7}}>
		      <PageHeader text={Data.navbar_items[4][0]}/>
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
			        	genbar()
					}
	            	<div style={{height:90}}/>
            	</div>
            </div>
    	</Page>
    )
}

export default Keywords