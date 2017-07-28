import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { reducer as formReducer } from 'redux-form'

import demo from './redux/demo/Demo';
import drawer from './redux/drawer/Drawer';
import auth from './redux/auth/AuthRedux';

import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/es/storage'

import { isImmutable, fromJS } from 'immutable'

// if you have reducers' state you don't want serialized,
// add them here 
const DO_NOT_SERIALIZE_PROPERTIES = [
  'form'
]

const immutableTransform = createTransform(  
  toSerialize,
  toDeserialize, 
)

const config = {
  key: 'root', // key is required
  storage, // storage is now required
  transforms: [immutableTransform],
}

const containersReducer = { 
  app: combineReducers({
    demo,
    drawer,
    auth,
    // NOTE: put other reducers here
  }) 
}

const createGlobalReducer = () => (
  persistReducer(config, 
    combineReducers({
      ...containersReducer,
      route: routerReducer,
      form: formReducer
    })
  )
)





export default createGlobalReducer;



function createTransform(inbound, outbound) {
  var config = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

  var whitelist = config.whitelist || null;
  var blacklist = config.blacklist || null;

  function whitelistBlacklistCheck(key) {
    if (whitelist && whitelist.indexOf(key) === -1) return true;
    if (blacklist && blacklist.indexOf(key) !== -1) return true;
    return false;
  }

  return {
    in: function _in(state, key) {
      return !whitelistBlacklistCheck(key) && inbound ? inbound(state, key) : state;
    },
    out: function out(state, key) {
      return !whitelistBlacklistCheck(key) && outbound ? outbound(state, key) : state;
    }
  };
}

function toSerialize(state, key) {
  let result = {}
  Object.keys(state).forEach(prop => {
    if( DO_NOT_SERIALIZE_PROPERTIES.indexOf(prop) < 0 ){
      if( isImmutable(state[prop]) ){
        result[prop] = state[prop].toJSON()
        result[prop].__IMMUTABLE = true 
      }else{
        result[prop] = state[prop]    
      }
    }
  })
  return result
}

function toDeserialize(state, key){
  Object.keys(state).forEach(prop => {
    if( DO_NOT_SERIALIZE_PROPERTIES.indexOf(prop) < 0
        && state[prop] && state[prop].__IMMUTABLE ){
      state[prop] = fromJS(state[prop])
    }
  })
  return state
}