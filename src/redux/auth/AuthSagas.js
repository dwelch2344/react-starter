import { takeLatest, call, put } from 'redux-saga/effects';

import { Types, Creators } from './AuthRedux'

import api from '../../svc/Requests'


function* doLogin(action){
  let {email, password, tenant_id} = action  
  try{ 
    const result = yield call( () => api.post('/api/iam/v1/auth/login', {email, password, tenant_id}) )
    yield put( Creators.loginSuccess(result.data) )      
  }catch( e ){
    yield put( Creators.loginFailed(e))
    return
  }
}


export default function* theSaga() {
  yield takeLatest(Types.LOGIN_REQUESTED, doLogin);
}

