import {
  take, fork, cancel, call,
} from 'redux-saga/effects';
import { createMockTask } from '@redux-saga/testing-utils';
import { loginFlow, authorize } from './auth';
import api from '../api';

describe('login Flow', () => {
  const generator = loginFlow();
  const email = 'test@test.test';
  const password = 'testpassword';

  it('waits for a user to request login', () => {
    const expectedYield = take('LOGIN_REQUEST');
    expect(generator.next().value).to.deep.equal(expectedYield);
  });

  it('forks the authorize task', () => {
    const expectedYield = fork(authorize, email, password);
    expect(generator.next({ email, password }).value).to.deep.equal(expectedYield);
  });

  it('waits for logout action then cancel authorize task', () => {
    const mockTask = createMockTask();
    const expectedTakeYield = { type: 'LOGOUT' };
    expect(generator.next(mockTask).value).to.deep.equal(expectedTakeYield);

    const expectedCancelYield = cancel(mockTask);
    expect(generator.next().value).to.deep.equal(expectedCancelYield);
  });
});
