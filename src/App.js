import React, { Component } from 'react';

import './generated/scss/App.css';
import 'font-awesome/css/font-awesome.css'

import store from './store'
import { Provider } from 'react-redux';

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { DemoActions } from './redux/demo/Demo'

import { AdminLoginPage } from './ui/Auth'
import { AuthSelectors } from './redux/auth/AuthRedux'

import {
  BrowserRouter as Router,
  Route, Switch, Redirect
} from 'react-router-dom'
import Layout from './ui/Layout'

import {Button} from 'react-bootstrap'



const Home = props => <div> <h1>Home</h1> <Button onClick={e => props.doSomething()}> Do Something </Button> </div>
const NotFound = ({match}) => <div><h1>Not Found!</h1> <p>Sorry, couldn't find anything under {JSON.stringify(match, null, 2)}</p> </div>


@connect( state => ({
  account: AuthSelectors.account(state),
}), dispatch => ({
  actions: bindActionCreators({
    ...DemoActions,
  }, dispatch)
}))
class App extends Component {
  render() {
    let {actions, account} = this.props
    let doSomething = () => {
      // actions.goodsSuccess({payload: 'foobar'})
      // actions.goodsFailure({error: true})
      actions.goodsAddPrice(1, 4)
    }

    return (      
        <Router basename="/admin/">
          <Layout>
            <div> 
              <Switch>              
                <Route exact path="/" component={() => <Redirect to={{pathname:'/home'}}/>}/>
                <Route exact path="/home" component={() => <Home doSomething={doSomething}/>}/>
                <Route path="/login" component={AdminLoginPage}/>
                <PrivateRoute path="/topics" component={() => <h1>Topics</h1>} account={account}/>              
                <Route component={NotFound}/>              
              </Switch>            
            </div>
          </Layout>
        </Router>
    );
  }
}


const PrivateRoute = ({ component: Component, anyRole=[], allRoles=[], account, ...rest}) => {
  let authenticated = false
  if( allRoles.length ){
    // TODO make sure user has all roles
    authenticated = true
  }else if( anyRole.length ){
    // TODO make sure user has ANY role
    authenticated = true
  }else{
    console.warn('Security misconfigured! Neither allRoles or anyRoles was configured for', Component)
  }

  return (
  <Route {...rest} render={props => (
    authenticated ? (
      <Component {...props}/>
    ) : (
      <Redirect to={{
        pathname: '/login',
        state: { from: props.location }
      }}/>
    )
  )}/>
)}
 
export default () => (
  <Provider store={store}>
    <App/>
  </Provider>
);

