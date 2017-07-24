

import React, { Component } from 'react';

import { LinkContainer } from 'react-router-bootstrap'

import 'bootstrap/dist/css/bootstrap.min.css'

import {Nav, NavItem, Navbar, NavDropdown, MenuItem} from 'react-bootstrap'

class LayoutRaw extends Component {
  render() {
    return (
      <div>
        <Navigation/>
        <div className="container">
          {this.props.children}  
        </div>        
      </div>
    )
  }
}

class Navigation extends Component {
  render() {
    return (
      <Navbar inverse collapseOnSelect>
        <Navbar.Header>
          <Navbar.Brand>
            <a href=""> Starter App </a>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav>
            <LinkContainer to="/">
              <NavItem eventKey={1.1}> Home </NavItem>
            </LinkContainer>
            <LinkContainer to="/about">
              <NavItem eventKey={1.2}> About </NavItem>
            </LinkContainer>
            <LinkContainer to="/topics">
              <NavItem eventKey={1.3}> Topics </NavItem>
            </LinkContainer>
            <NavDropdown eventKey={3} title="Dropdown" id="basic-nav-dropdown">
              <MenuItem eventKey={3.1}>Action</MenuItem>
              <MenuItem eventKey={3.2}>Another action</MenuItem>
              <MenuItem eventKey={3.3}>Something else here</MenuItem>
              <MenuItem divider />
              <MenuItem eventKey={3.3}>Separated link</MenuItem>
            </NavDropdown>
          </Nav>
          <Nav pullRight>
            {/* <Navbar.Text>Text Right</Navbar.Text> */}
            <NavItem eventKey={1} href="#">Link Right</NavItem>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    )
  }
}

export default LayoutRaw