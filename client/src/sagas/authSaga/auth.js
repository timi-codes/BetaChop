import {
  take, call, put, fork, cancel, cancelled,
} from 'redux-saga/effects';
import * as api from '../Api';

export function* authorize(email, password) {
  try {
    const { data } = yield call(api.login, { email, password });
    yield put({ type: 'LOGIN_SUCCESS', data });
    yield call(api.storeItem, { token: data.token });
  } catch (error) {
    yield put({ type: 'LOGIN_ERROR', error });
  } finally {
    if (yield cancelled()) {
      // ... put special cancellation handling code here
    }
  }
}

export function* loginFlow() {
  while (true) {
    const { email, password } = yield take('LOGIN_REQUEST');
    const task = yield fork(authorize, email, password);
    const action = yield take(['LOGOUT', 'LOGIN_ERROR']);
    if (action.type === 'LOGOUT') yield cancel(task);
    yield call(api.clearItem, 'token');
  }
}
