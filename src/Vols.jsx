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


function genQuery(symbol, startTime, endTime)
{
	return Data.vol_endpoint + 
					"?stock_symbol=" + symbol + 
					"&start_date=" + startTime + 
					"&end_date=" + endTime;
}


const Vols = () => 
{
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

		var endpoint = genQuery(symbol, startTime, endTime);
		console.log (endpoint);
		fetch(endpoint)
		  .then(function(response) {
		    return response.json();
		  })
		  .then(function(myJson) {
		  	setNodata(true)
		    console.log(JSON.stringify(myJson));
		    var data1 = [];
		    var data2 = [];
		    myJson["res"].forEach(function(e){
		    	var date = e["ts"];
		    	var newdate = date.substring(5,7) + "/" + date.substring(8,10) + "/" + date.substring(0,4);
		    	data1.push({"x" : new Date(newdate), "y": e["moving_10_volatility"]})
		    	data2.push({"x" : new Date(newdate), "y": e["moving_30_volatility"]})

		    	setNodata(false)
		    });
		    setGraphData1(data1);
		    setGraphData2(data2);
		  })
		  .catch(function(error){
		  	console.log(error);
		  });
		  
		setLoading(false);
	}

	
	var datePlaceholder = "YYYY-MM-DD"

	const searchArea =
				<div>
			        <MyTextField name={"Symbol"} defaultValue={symbol} onChange={(e)=> setSymbol(e.target.value)}/>
			        <span> &nbsp; &nbsp; </span>
			        <MyTextField name={"Start Date"} defaultValue={startTime} placeholder = {datePlaceholder} onChange={(e)=> setStartTime(e.target.value)}/>
				    <span> &nbsp; &nbsp; </span>
				    <MyTextField name={"End Date"} defaultValue={endTime} placeholder = {datePlaceholder}  onChange={(e) => setEndTime(e.target.value)}/>
				</div>
				;
		

	const genlineseries = [graphData1, graphData2];

	
	return ( genGraphPage(Data.navbar_items[1][0], searchArea, sendQuery, nodata, loading, genlineseries));
}

export default Vols