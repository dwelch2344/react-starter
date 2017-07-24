import { createStore, applyMiddleware } from 'redux';
import { routerMiddleware } from 'react-router-redux';
import createHistory from 'history/createBrowserHistory';
// import createSagaMiddleware from 'redux-saga';
// import thunk from 'redux-thunk';
// import { fromJS, toJS} from 'immutable';
// import { initialState } from './containers/App/reducer'

import createGlobalReducer from './global-reducer';
// import globalSagas from './global-sagas';

export const history = createHistory();
// const sagaMiddleware = createSagaMiddleware();


const middlewares = [
  // Middleware for intercepting and dispatching navigation actions
  routerMiddleware(history),
  // sagaMiddleware,
  // thunk
];



// let appReducer = {...initialState}

// appReducer.slug = slug
// appReducer.cart = loadFromLocal('cart') || appReducer.cart
// appReducer.auth = loadFromLocal('auth') || appReducer.auth

// we could set auth here... but do we really need to? 
// if( appReducer.auth && appReducer.auth.account && appReducer.auth.account.token ){
//   console.log('token', appReducer.auth.account.token)
// }

// const cart = existingCart ? JSON.parse(existingCart) : { items: [], subtotal: 0 }  // TODO pull default from reducer?
const state = { 
  // containers: {
  //   appReducer: fromJS(appReducer)
  // },
  // route: {}
}

const g = createGlobalReducer()

const store = createStore(
  g,
  state,
  applyMiddleware(...middlewares),
);

// store.subscribe( () => {
//   // use selectors? 
//   const app = store.getState().containers.appReducer.toJS()
//   const {cart, auth} = app

//   delete auth.error

//   localStorage.setItem('cart', JSON.stringify(cart))
//   localStorage.setItem('auth', JSON.stringify(auth))
// })

// function loadFromLocal(id){
//   let result = localStorage.getItem(id)
//   if( result ){
//     result = JSON.parse(result)
//   }
//   return result
// }

// TODO listen for localStorage changes (from another tab / window)

// sagaMiddleware.run(globalSagas);

export default store;
