import React, { Component, useState} from 'react';


import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import {XYPlot, XAxis, YAxis, VerticalGridLines, HorizontalGridLines, LineSeries, LineSeriesCanvas, VerticalBarSeries} from 'react-vis'

import * as Data from './data.js';

import Page from './Page.jsx'
import MyDropDown from './MyDropDown.jsx'
import MyTextField from './MyLineEdit.jsx'
import { PageHeader} from './WelcomeHeader.jsx'

import './styles.css'
const blueData = [{x: 'A', y: 12}, {x: 'B', y: 2}, {x: 'C', y: 11}];

const genBar = (nodata, loading, lineseries) =>
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
	                <VerticalBarSeries barWidth={0.5} data={blueData} />

            	</XYPlot>);
}

const genGraph = (nodata, loading, lineseries) =>
{
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

		if (lineseries.length == 1)
		{
			return (

				<XYPlot
					xType='time'
	                width={Data.chartWidth}
	                height={Data.chartHeight}>
	                <VerticalGridLines />
	                <HorizontalGridLines / >
	                <XAxis />
	                <YAxis />
	                <LineSeries
					        fill="none"
					        color="red"
					        data={lineseries[0]}
					      	/>

            	</XYPlot>);
		}

		if (lineseries.length == 2)
		{
			return (

				<XYPlot
					xType='time'
	                width={Data.chartWidth}
	                height={Data.chartHeight}>
	                <VerticalGridLines />
	                <HorizontalGridLines / >
	                <XAxis />
	                <YAxis />
	                <LineSeries

					        fill="none"
					        color="red"
					        data={lineseries[0]}
					      />
	                <LineSeries

					        fill="none"
					        color="blue"
					        data={lineseries[1]}
					      />
            	</XYPlot>)
		}
	};

const genGraphPage = (pageheader, searchArea, sendQuery, nodata, loading, graphData) =>
{
	return(
		<Page>
		    <div style={{textAlign: "center", background:'#fff', opacity:.7}}>
		      <PageHeader text={pageheader}/>
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
		       <div style={{display:'flex', flexDirection:'column', alignItems:"center", justifyContent:"center"}}>
			        {genGraph(nodata, loading, graphData)}
	            	<div style={{height:90}}/>
            	</div>
            </div>
    	</Page>
    )
}

export default genGraphPage