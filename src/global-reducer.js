import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import demo from './redux/demo/Demo';
import drawer from './redux/drawer/Drawer';

const containersReducer = { 
  app: combineReducers({
    demo,
    drawer
    // NOTE: put other reducers here
  }) 
}

const createGlobalReducer = () => (
  combineReducers({
    ...containersReducer,
    route: routerReducer,
  })
)


export default createGlobalReducer;
