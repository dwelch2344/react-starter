// sampleReducer.js
import { createReducer, createActions } from 'reduxsauce'

const { Types, Creators } = createActions({
  goodsSuccess: ['payload'],
  goodsFailure: ['error'],
  goodsAddPrice: (a, b) => {
    console.log('test')
    return ({ type: Types.GOODS_ADD_PRICE, total: a + b })
  }
}, {}) 

// the initial state of this reducer
export const INITIAL_STATE = { 
  error: false, goodies: null 
}

const success = (state = INITIAL_STATE, action) => 
  ({ ...state, error: false, goodies: action.goodies })

const failure = (state = INITIAL_STATE, action) => 
  ({ ...state, error: true, goodies: null })

const goodsAddPrice = (state, action) => {
  debugger;
  return state
}

// map our action types to our reducer functions
const HANDLERS = {
  [Types.GOODS_SUCCESS]: success,
  [Types.GOODS_FAILURE]: failure,
  [Types.GOODS_ADD_PRICE]: goodsAddPrice
}

// export our *NAMED* actions and our reducer
export const DemoActions = Creators
export default createReducer(INITIAL_STATE, HANDLERS)