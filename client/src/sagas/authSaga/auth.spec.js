import test from 'tape';
import {
  take, fork, cancel, call, put,
} from 'redux-saga/effects';
import { createMockTask, cloneableGenerator } from '@redux-saga/testing-utils';
import { loginFlow, authorize } from './auth';
import * as api from '../Api';

const email = 'test@test.test';
const password = 'testpassword';

test('authorize', (assert) => {
  const gen = authorize(email, password);
  const { data } = { data: '' };

  assert.deepEqual(
    gen.next().value,
    call(api.login, { email, password }),
    'should call login with user credential',
  );

  assert.deepEqual(
    gen.next({ data }).value,
    put({ type: 'LOGIN_SUCCESS', data }),
    'should dispatch login success',
  );

  assert.deepEqual(
    gen.next({ data }).value,
    call(api.storeItem, { token: data.token }),
    'should store authentication token',
  );

  // create fake error
  const error = {};

  assert.deepEqual(
    gen.throw(error).value,
    put({ type: 'LOGIN_ERROR', error }),
    'should yield an login error',
  );

  assert.end();
});

/**
 * Login Flow Test
 */
test('login Flow', (assert) => {
  const gen = cloneableGenerator(loginFlow)();

  assert.deepEqual(gen.next().value, take('LOGIN_REQUEST'), 'waits for a user to request login');

  assert.deepEqual(
    gen.next({ email, password }).value,
    fork(authorize, email, password),
    'forks the authorize task',
  );

  const mockTask = createMockTask();
  assert.deepEqual(
    gen.next(mockTask).value,
    take(['LOGOUT', 'LOGIN_ERROR']),
    'waits for logout or login error',
  );

  assert.test('waits for logout action then cancel authorize task and clear token', (a) => {
    const clone = gen.clone();

    a.deepEqual(clone.next({ type: 'LOGOUT' }).value, cancel(mockTask), 'should cancel task');
    a.deepEqual(clone.next().value, call(api.clearItem, 'token'), 'should clear token if exist');
    a.end();
  });

  assert.test('waits for login error action then clear token', (a) => {
    const clone = gen.clone();

    a.deepEqual(
      clone.next({ type: 'LOGIN_ERROR' }).value,
      call(api.clearItem, 'token'),
      'should clear token if exist',
    );
    a.end();
  });
  assert.end();
});
