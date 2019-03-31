import { all } from 'redux-saga/effects';
import { loginFlow } from './authSaga/auth';

export default function* rootSaga() {
  yield all([loginFlow()]);
}
