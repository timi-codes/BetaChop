import { take, call, put } from 'redux-saga/effects';
import Api from './Api';

function* authorize(user, password) {
  try {
    const token = yield call(Api.authorize, user, password);
    yield put({ type: 'LOGIN_SUCCESS', token });
    return token;
  } catch (error) {
    yield put({ type: 'LOGIN_ERROR', error });
  }
}

function* loginFlow() {
  while (true) {
    const { user, password } = yield take('LOGIN_REQUEST');
    const token = yield call(authorize, user, password);
    if (token) {
      yield call(Api.storeItem, { token });
      yield take('LOGOUT');
      yield call(Api.clearItem, 'token');
    }
  }
}
