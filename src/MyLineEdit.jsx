import React, { Component, useState} from 'react';
import TopNavbar from './Navbar.jsx';

import { makeStyles } from '@material-ui/core/styles';

import {Link} from 'react-router-dom';

import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';

const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
    marginTop: 0,
    marginBottom:0
  },
}));

const MyTextField = (props) => {
	const [active, setActive] = useState("");
	 const classes = useStyles();

	return (
		
	        <TextField
	          id={props.name+"id"}
	          className={classes.textField}
	          label={props.name}
	          margin="normal"
	          placeholder={props.placeholder}
	          onChange={props.onChange}
	        />
   
      )
}

export default MyTextField;