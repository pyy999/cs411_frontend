
import { makeStyles } from '@material-ui/core/styles';

export const NAME = 'Tendies';
export const HEADER_TEXT = 'Wall street bets is always right';
const ip = "http://172.22.158.49:8000"
//const ip = "http://127.0.0.1:8000"
export const tick_endpoint = ip + '/tick_data';
export const vol_endpoint = ip + '/moving_volatility';
export const upload_endpoint = ip + '/insert_tick_data/'
export const delete_endpoint = ip + '/delete_tick_data/';
export const dis_endpoint = ip + '/subreddit_sentiment_disagreement'
export const count_endpoint = ip + '/sentiment_count'
export const poplularity_endpoint = ip + '/sentiment_popularity_correlation';
//export const database_endpoint = 'http://172.22.158.49:8000/tick_data/';

export const navbar_items = [
	["Search Specific Symbol", "/graphs"],
	["Moving Volatility", "/vols"],
	["Subreddit Sentiment Disagreement", "/disagree"],
	["Sentiment Popularity Corellation", "/popularity"],
	["Company Sentiment", "/company"],
	["Upload Data","/upload"],
	["Delete Data","/delete"]
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

export const chartWidth = 1400;
export const chartHeight = 500;

export const graphDataInit = [
		                        {x: 2, y: 4},
		                        {x: 5, y: 2},
		                        {x: 15, y: 6}
		                     ];

export const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));