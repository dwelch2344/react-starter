import { fromJS, isImmutable } from 'immutable'
import { createReducer, createActions } from 'reduxsauce'

export const { Types, Creators } = createActions({
  loginRequested: ['email', 'password', 'tenant_id'],
  loginSuccess: ['account'],
  loginFailed: ['error']
}, {}) 

// the initial state of this reducer
export const INITIAL_STATE = fromJS({ 
  connecting: false,
  account: undefined,
  error: undefined
})

const requested = (state = INITIAL_STATE, action) =>
  state //.set('account', undefined)
       .set('error', undefined)
       .set('connecting', true)
const success = (state = INITIAL_STATE, action) => 
 state.set('account', fromJS(action.account))
       .set('error', undefined)
       .set('connecting', false)

const failed = (state = INITIAL_STATE, action) => 
  state.set('account', undefined)
       .set('error', action.error)
       .set('connecting', false)

// map our action types to our reducer functions
const HANDLERS = {
  [Types.LOGIN_REQUESTED]: requested,
  [Types.LOGIN_SUCCESS]: success,
  [Types.LOGIN_FAILED]: failed
}

// export our *NAMED* actions + selectors, and our reducer
export default createReducer(INITIAL_STATE, HANDLERS)
export const AuthActions = Creators
export const AuthSelectors = {
  account: state => {
    // console.log(state.app.auth)
    return state.app.auth && unwrap(state.app.auth.get('account'))
  },
  error: state => state.app.auth && state.app.auth.get('error')
}


function unwrap(obj){
  if( obj && isImmutable(obj) ){
    obj = obj.toJS()
  }
  return obj
}