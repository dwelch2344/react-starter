

import React, { Component } from 'react';

import { withRouter } from 'react-router-dom'
import { LinkContainer } from 'react-router-bootstrap'

import 'bootstrap/dist/css/bootstrap.min.css'
import Avatar from '../image/avatar.png'

import {
  Nav, NavItem, Navbar, Image, Link,
  // NavDropdown, MenuItem,
} from 'react-bootstrap'
import Drawer from 'react-motion-drawer';


import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { DrawerActions, DrawerSelectors } from '../redux/drawer/Drawer'
import { AuthSelectors } from '../redux/auth/AuthRedux'

class LayoutRaw extends Component {

  render() {
    let {drawerClose} = this.props.actions
    let onChange = arg1 => {
      if( arg1 === false ){
        drawerClose()
      }
    }
    
    return (
      <div>
        <Drawer right={true} 
            className="action-drawer"
            open={this.props.drawerOpen} onChange={onChange}>
          <p>Give the user their options here. Because dropdowns are so uncool </p>
        </Drawer>
        <Navigation actions={this.props.actions}/>
        <div className="container">
          {this.props.children}  
        </div>        
      </div>
    )
  }
}

@connect( state => ({
  account: AuthSelectors.account(state),
}), dispatch => ({}))
class Navigation extends Component {
  render() {
    let { account } = this.props
    return (
      <Navbar inverse collapseOnSelect style={{borderRadius: 0}}>
        <Navbar.Header>
          <Navbar.Brand>
            <a href=""> Hexly </a>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav>
            <PrivateLink to='/home' isAuthenticated> 
              <NavItem eventKey={1.1}> Home </NavItem>
            </PrivateLink>            
            <LinkContainer to="/about">
              <NavItem eventKey={1.2}> About </NavItem>
            </LinkContainer>
            <LinkContainer to="/topics">
              <NavItem eventKey={1.3}> Topics </NavItem>
            </LinkContainer>
            {/* <NavDropdown eventKey={3} title="Dropdown" id="basic-nav-dropdown">
              <MenuItem eventKey={3.1}>Action</MenuItem>
              <MenuItem eventKey={3.2}>Another action</MenuItem>
              <MenuItem eventKey={3.3}>Something else here</MenuItem>
              <MenuItem divider />
              <MenuItem eventKey={3.3}>Separated link</MenuItem>
            </NavDropdown> */}
          </Nav>
          <Nav pullRight>
            {/* <Navbar.Text>Text Right</Navbar.Text> */}
            <PrivateLink isAuthenticated> 
              <NavItem eventKey={3} href="#" onClick={ e => this.props.actions.drawerOpen()}>
                <Image src={Avatar} width={25} circle style={{marginRight: 5}}/> {` ${account ? account.first_name + ' ' + account.last_name : ''}` }
              </NavItem>
            </PrivateLink>   
            <PrivateLink to='/login' isUnauthenticated> 
              <NavItem eventKey={1.3}> Login </NavItem>
            </PrivateLink>                     
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    )
  }
}






@connect( state => ({
  account: AuthSelectors.account(state),
}), dispatch => ({}))
class PrivateLink extends Component {
  render(){
    let authenticated = false
    let { 
      account, to, children, 
      allRoles, anyRole, 
      isAuthenticated, isUnauthenticated
    } = this.props

    if( allRoles && allRoles.length ){
      // TODO make sure user has all roles
      authenticated = true
    }else if( anyRole && anyRole.length ){
      // TODO make sure user has ANY role
      authenticated = true
    }else if( isAuthenticated !== undefined ){
      authenticated = !!account
    }else if( isUnauthenticated !== undefined ){
      authenticated = !account
    }else{
      console.warn('Security misconfigured! Did not configure allRoles, anyRoles, isAuthenticated or isUnauthenticated for', Component)
    }

    let component = null
    if( authenticated ){
      if( to ){
        component = (
          <LinkContainer to={to}>
            {children}
          </LinkContainer>
        )
      }else{
        component = children
      }
    }

    return component
  }
}

const mapStateToProps = state => ({
  drawerOpen: DrawerSelectors.open(state)
})

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
    ...DrawerActions,
  }, dispatch)
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(LayoutRaw))