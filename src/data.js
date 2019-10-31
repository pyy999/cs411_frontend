export const NAME = 'Tendies';
export const HEADER_TEXT = 'Wall street bets is always right';
export const database_endpoint = 'http://127.0.0.1:8000/tick_data/';
//export const database_endpoint = 'http://172.22.158.49:8000/tick_data/';

export const navbar_items = [
	["Search Specific Symbol", "/graphs"],
	["Upload Data","/upload"],
	["Query Data","/search"]
]

export const timeperioditems = 
[
	'Last Day',
	'Last Week',
	'Last Month',
	'Last Year'
]

export const symbols = 
[
	'All Symbols',
	'AAPL',
	'AMZN',
	'BAC',
	'TSLA',
	'SPY'
]

export const subreddits = 
[
	'All Sybreddits',
	'r/wallstreetbets',
	'r/finance'
]

export const chartWidth = 1000;
export const chartHeight = 400;

export const graphDataInit = [
		                        {x: 2, y: 4},
		                        {x: 5, y: 2},
		                        {x: 15, y: 6}
		                     ];