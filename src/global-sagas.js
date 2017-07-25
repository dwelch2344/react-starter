import { fork, all } from 'redux-saga/effects';

import demoSagas from './redux/demo/Sagas';

const sagas = [
  demoSagas,
  // NOTE: put other app sagas here
];

function* globalSagas() {
  const globalSagasForks = sagas.map((saga) => fork(saga));
  
  yield all([...globalSagasForks]);
}

export default globalSagas;
