import React, {Component, useState} from "react";
import {Link} from 'react-router-dom';
import * as Data from './data.js';
import {
    Collapse,
    NavbarToggler,
    NavbarBrand,
    Nav,
    Navbar,
    NavLink,
    NavItem,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem } from 'reactstrap';

export default class TopNavbar extends Component {
    constructor(props) {
      super(props);
  
      this.toggle = this.toggle.bind(this);
      this.state = {
        isOpen: false
      };
    }

    toggle() {
      this.setState({
        isOpen: !this.state.isOpen
      });
    }

    genOptions() {
        var ret = [];
        for(var i = 0; i < Data.navbar_items.length; i++){
          ret.push(
            <span key={"akey" + Data.navbar_items[i][0]}>
              <Link to={Data.navbar_items[i][1]} key={"key" + Data.navbar_items[i][0]}> 
                   {Data.navbar_items[i][0]} 
                </Link> 
               <span key={"skey" + Data.navbar_items[i][0]}>
               &nbsp; &nbsp;
               </span>
           </span> )
        }
        return ret;
    }

    render() {
      return (
        <div>
          <Navbar color="light" light expand="md">
            <NavbarBrand href="/">{Data.NAME}</NavbarBrand>
            <NavbarToggler onClick={this.toggle} />
            <Collapse isOpen={this.state.isOpen} navbar>
              <Nav className="ml-auto" navbar>
                {this.genOptions()}
              
              </Nav>
            </Collapse>
          </Navbar>
        </div>
      );
    }
  }