import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import demo from './redux/demo/Demo';

const containersReducer = combineReducers({
  demo,
  // NOTE: put other reducers here
});

const createGlobalReducer = () => (
  combineReducers({
    ...containersReducer,
    route: routerReducer,
  })
);

export default createGlobalReducer;
