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




const Disagrees = () => 
{
	const [subreddit_name, setSubreddit_name] = useState("wallstreetbets");
	const [subreddit_name2, setSubreddit_name2] = useState("stocks");
	const [startTime, setStartTime] = useState("2018-12-12");
	const [timePeriod, setTimePeriod] = useState("");
	const [endTime, setEndTime] = useState("2019-12-12");
	const [loading, setLoading] = useState(false);
	const [nodata, setNodata] = useState(false);
	const [graphData1, setGraphData1] = useState([]);
	const [graphData2, setGraphData2] = useState([]);
	
	const classes = Data.useStyles();

	const month_to_num = {
		"01":"01/01/2019",
		"02":"02/01/2019",
		"03":"03/01/2019",
		"04":"04/01/2019",
		"05":"05/01/2019",
		"06":"06/01/2019",
		"07":"07/01/2019",
		"08":"08/01/2019",
		"09":"09/01/2019",
		"10":"10/01/2019",
		"11":"11/01/2019",
		"12":"12/01/2018",
	}

function genQuery()
{
	return Data.dis_endpoint + 
					"?subreddit_name=" + subreddit_name + 
					"&subreddit_name_2=" + subreddit_name2 + 
					"&start_date=" + startTime + 
					"&end_date=" + endTime;
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
		    var data2 = [];
		    myJson["res"].forEach(function(e){
		    	if (e["p_month"]== "12"){return}
		    	var newdate = month_to_num[e["p_month"]];
		    	console.log(newdate)
		    	data1.push({"x" : new Date(newdate), "y": e["p_sentiment"]-e["other_p_sentiment"]})
		    	data2.push({"x" : new Date(newdate), "y": e["c_sentiment"]-e["other_c_sentiment"]})
		    	setNodata(false)
		    });
		    console.log(data1);
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
			        <MyTextField name={"Subreddit Name 1"} defaultValue={subreddit_name} onChange={(e)=> setSubreddit_name(e.target.value)}/>
			        <span> &nbsp; &nbsp; </span>
			        <MyTextField name={"Subreddit Name 2"} defaultValue={subreddit_name2} onChange={(e)=> setSubreddit_name2(e.target.value)}/>
			        <span> &nbsp; &nbsp; </span>
			        <MyTextField name={"Start Date"} defaultValue={startTime} placeholder = {datePlaceholder} onChange={(e)=> setStartTime(e.target.value)}/>
				    <span> &nbsp; &nbsp; </span>
				    <MyTextField name={"End Date"} defaultValue={endTime} placeholder = {datePlaceholder}  onChange={(e) => setEndTime(e.target.value)}/>
				</div>
				;
		

	const genlineseries = [graphData1, graphData2]
	

	return ( genGraphPage(Data.navbar_items[2][0], searchArea, sendQuery, nodata, loading, genlineseries));
}

export default Disagrees