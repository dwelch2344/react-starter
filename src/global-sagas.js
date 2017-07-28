import { fork, all } from 'redux-saga/effects';

import demoSagas from './redux/demo/Sagas';
import authSagas from './redux/auth/AuthSagas';

const sagas = [
  demoSagas,
  authSagas,
  // NOTE: put other app sagas here
];

function* globalSagas() {
  const globalSagasForks = sagas.map((saga) => fork(saga));
  
  yield all([...globalSagasForks]);
}

export default globalSagas;
