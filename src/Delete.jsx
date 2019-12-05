import React, { Component, useState} from 'react';

import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import {XYPlot, XAxis, YAxis, VerticalGridLines, HorizontalGridLines, LineSeries, LineSeriesCanvas} from 'react-vis'

import * as Data from './data.js';

import Page from './Page.jsx'
import MyDropDown from './MyDropDown.jsx'
import MyTextField from './MyLineEdit.jsx'
import {PageHeader} from './WelcomeHeader.jsx'

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


const Delete = () => 
{
	const [symbol, setSymbol] = useState("");
	const [subreddit, setSubreddit] = useState("");
	const [startTime, setStartTime] = useState("");
	const [endTime, setEndTime] = useState("");
	const [loading, setLoading] = useState(false);
	const [graphData, setGraphData] = useState(Data.graphDataInit);
	
	const classes = useStyles();

	function sendQuery() 
	{
		if(symbol === ""){
			setSymbol("All Symbols")
		}
		if(subreddit === "" || subreddit === "All Subreddits"){
			setSubreddit("all")
		}

		setLoading(true);

		var endpoint = Data.delete_endpoint + 
					symbol + 
					"/" + startTime + 
					"/" + endTime;

		console.log (endpoint);
		fetch(endpoint)
		  .then(function(response) {
		    return response.json();
		  })
		setLoading(false);
	}

	var datePlaceholder = "YYYY-MM-DD"
	return (
		<Page>
		    <div style={{textAlign: "center", background:'#fff', opacity:.7}}>
		      <PageHeader text={Data.navbar_items[6][0]}/>
			  <div style={{height:30}}/>
			  <Grid container spacing={0}>
		        <Grid item xs={12}>
		        <div>
			        <MyTextField name={"Symbol"} onChange={(e)=> setSymbol(e.target.value)}/>
			        <span> &nbsp; &nbsp; </span>
			        <MyTextField name={"Start Date"} placeholder = {datePlaceholder} onChange={(e)=> setStartTime(e.target.value)}/>
				    <span> &nbsp; &nbsp; </span>
				    <MyTextField name={"End Date"} placeholder = {datePlaceholder}  onChange={(e) => setEndTime(e.target.value)}/>
				    {/*<MyDropDown items={Data.timeperioditems} 
				      flavorText={"Time Period:"} 
				      formControl={classes.formControl} 
				      setItem={setTimePeriod}/> */}
				</div>
			      	<div style={{height:10}}/>
			        <div style={{height:100}}>
			      		<Button type="button" color="primary" onClick={sendQuery}>
			      			<h2>Run Delete Scriptt</h2>
			      		</Button>
					</div>

		        </Grid>
		       </Grid>
		       </div>
		</Page>
	);
}

export default Delete