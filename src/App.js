import React, { Component } from 'react';

import './App.css';

import store from './store'
import { Provider } from 'react-redux';

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import {DemoActions} from './redux/demo/Demo'

import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom'
import Layout from './ui/Layout'

import {Button} from 'react-bootstrap'

class AppRaw extends Component {
  render() {
    let {actions} = this.props
    let doSomething = () => {
      // actions.goodsSuccess({payload: 'foobar'})
      // actions.goodsFailure({error: true})
      actions.goodsAddPrice(1, 4)
    }

    return (      
        <Router>
          <Layout>
            <div>            
              <Route exact path="/" render={() => <Home doSomething={doSomething}/>}/>
              <Route path="/about" render={About}/>
              <Route path="/topics" render={Topics}/>
            </div>
          </Layout>
        </Router>
    );
  }
}

const Home = props => <div> <h1>Home</h1> <Button onClick={e => props.doSomething()}> Do Something </Button> </div>
const About = () => <h1>About</h1>
const Topics = () => <h1>Topics</h1>



const mapStateToProps = state => ({
  // cart: selectCart(state).toJS()
})

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
    ...DemoActions,
  }, dispatch)
})

const App = connect(mapStateToProps, mapDispatchToProps)(AppRaw);
 
export default () => (
  <Provider store={store}>
    <App/>
  </Provider>
);

