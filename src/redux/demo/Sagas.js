import { takeLatest, call, put } from 'redux-saga/effects';

import { Types, DemoActions } from './Demo'

function dummyAsync(delay){
  return new Promise( resolve => setTimeout(resolve, delay))
}

function* wrapDummyAsync(){
  const result = yield call(dummyAsync, 3 * 1000)
  
  if( result instanceof Error ){
    yield put( DemoActions.goodsError(result))
  }else{
    yield put( DemoActions.goodsSuccess(result))
  }
}

function* theSaga() {
  yield takeLatest(Types.GOODS_ADD_PRICE, wrapDummyAsync);
}

export default theSaga;
