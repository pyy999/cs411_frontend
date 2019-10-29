import React, { Component } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import * as Data from './data.js';


require("typeface-open-sans")

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

export const PageHeader = (props) => {
  return (
    <div
        style={{ display:'flex', flexDirection:'column', 
            alignItems:"center", justifyContent:"center", 
            height:100, color:'black'}}>
        <h2> {props.text} </h2> 
    </div>
  )
}

const WelcomeHeader = () => { 
  return(
    <div
        style={{ display:'flex', flexDirection:'column', 
            alignItems:"center", justifyContent:"center", height:500}}>
        <h4> {Data.HEADER_TEXT} </h4> 
    </div>
  )
}
export default WelcomeHeader;