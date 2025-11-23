import * as api from '../utils/burger-api';
import { configureStore } from '@reduxjs/toolkit';
import reducer, {
  initialState,
  loginUser,
  logOutParam,
  setAuthState,
  getLoginState
} from './loginSlice';

describe('loginSlice reducers', () => {
  test('loginUser test', () => {
    const action = logOutParam(false);
    const newState = reducer(
      { ...initialState, isAuthenticated: true },
      action
    );
    expect(newState.isAuthenticated).toBe(false);
  });
  test('setAuthState test', () => {
    const action = setAuthState(false);
    const newState = reducer(
      { ...initialState, isAuthenticated: true },
      action
    );
    expect(newState.isAuthenticated).toBe(false);
  });
});

describe('loginSlice async actions', () => {
  let store: any;
  afterAll(() => {
    jest.restoreAllMocks();
  });
  beforeEach(() => {
    jest.clearAllMocks();
    store = configureStore({
      reducer: {
        loginReducer: reducer
      }
    });
  });

  test('should handle pending state', async () => {
    const state = reducer(
      initialState,
      loginUser.pending('', { password: 'password', email: 'test@example.com' })
    );
    expect(state.loginUserRequest).toBe(true);
    expect(state.isAuthenticated).toBe(false);
    expect(state.loginUserError).toBe('');
  });

  test('Test fetchLoginUser fulfiled', () => {
    const state = reducer(
      initialState,
      loginUser.fulfilled(
        {
          success: true,
          refreshToken: 'refreshToken',
          accessToken: 'accessToken',
          user: {
            email: 'test@example.com',
            name: 'Test User'
          }
        },
        '',
        { password: 'password', email: 'test@example.com' }
      )
    );
    expect(state.loginUserRequest).toBe(false);
    expect(state.isAuthenticated).toBe(true);
    expect(state.loginUserError).toBe('');
  });

  test('should handle rejected state', async () => {
    const state = reducer(
      initialState,
      loginUser.rejected({ name: 'fail', message: 'error' }, '', {
        password: 'password',
        email: 'test@example.com'
      })
    );
    expect(state.loginUserRequest).toBe(false);
    expect(state.isAuthenticated).toBe(false);
    expect(state.loginUserError).toBe('error');
  });
});
