import React, {Component} from 'react'

import { Field, reduxForm } from 'redux-form'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { AuthActions, AuthSelectors } from '../redux/auth/AuthRedux'

import { Alert } from 'react-bootstrap'

const AdminLoginForm = reduxForm( {form: 'login'})( (props) => (
    <div className="login-form-1">      
      <form id="login-form" className="text-left" onSubmit={ props.handleSubmit }>
        <div className="login-form-main-message" />
        <div className="main-login-form">
          <div className="login-group">
            <div className="form-group">
              <label htmlFor="tenant_id" className="sr-only">Tenant ID</label>
              <Field component="input" type="text" className="form-control" name="tenant_id" placeholder="Tenant ID"/>
            </div>
            <div className="form-group">
              <label htmlFor="email" className="sr-only">Email</label>
              <Field component="input" type="text" className="form-control" name="email" placeholder="Email" />
            </div>
            <div className="form-group">
              <label htmlFor="password" className="sr-only">Password</label>
              <Field component="input" type="password" className="form-control" name="password" placeholder="Password" />
            </div>            
          </div>
          <button type="submit" className="login-button" >
            <i className="fa fa-chevron-right" />
          </button>
        </div>
      </form>
    </div>
) )

@connect(state => ({
  account: AuthSelectors.account(state),
  error: AuthSelectors.error(state),
}), dispatch => ({
  actions: bindActionCreators({...AuthActions}, dispatch)
}))
export class AdminLoginPage extends Component {

  render(){
    let {account, error } = this.props    

    if( error ){
      if( error.response ){
        error = error.response.data.message
      }else if( error.request ){
        error = 'Failed to receive response from server.'
      }else {
        error = 'Failed configuring HTTPS transport.'
      }
    }

    return (
      <div className="login-page align-center">
        { error && (
          <Alert bsStyle='danger'>
            <strong> Authentication failed: </strong> 
            We're sorry, but something went wrong: 
            <p>{error}</p>
          </Alert>
        )}
        <AdminLoginForm onSubmit={ 
          v => this.props.actions.loginRequested(v.email, v.password, v.tenant_id)
        }/>
      </div>
    )
  }



}
