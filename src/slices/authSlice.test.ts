import { configureStore } from '@reduxjs/toolkit';
import * as api from '../utils/burger-api';
import reducer, {
  setFormValues,
  initialState,
  fetchRegister
} from './authSlice';

describe('authSlice', () => {
  test('setFormValues multiple updates test', () => {
    let newState = reducer(
      initialState,
      setFormValues({ field: 'email', value: 'test@example.com' })
    );
    newState = reducer(
      newState,
      setFormValues({ field: 'name', value: 'Ranel' })
    );
    newState = reducer(
      newState,
      setFormValues({ field: 'password', value: '123' })
    );
    expect(newState.form.email).toEqual('test@example.com');
    expect(newState.form.name).toEqual('Ranel');
    expect(newState.form.password).toEqual('123');
  });
});

describe('authSlice async tests', () => {
  afterAll(() => {
    jest.restoreAllMocks();
  });
  let store: any;
  beforeEach(() => {
    store = configureStore({
      reducer: {
        registerReducer: reducer
      }
    });
  });
  test('should handle pending state', async () => {
    const authSpy = jest
      .spyOn(api, 'registerUserApi')
      .mockImplementation(() => new Promise(() => {}));

    store.dispatch(
      fetchRegister({
        email: 'test@example.com',
        password: 'password',
        name: 'Ranel'
      })
    );

    const state = store.getState().registerReducer;
    expect(state.sending).toBe(true);
    expect(state.isRegistered).toBe(false);
    expect(state.error).toBe('');
  });

  test('should handle fulfilled state', async () => {
    const mockResponse = {
      success: true,
      refreshToken: 'refreshToken123',
      accessToken: 'accessToken123',
      user: { email: 'test@example.com', name: 'Ranel', password: 'password' }
    };

    const authSpy = jest
      .spyOn(api, 'registerUserApi')
      .mockResolvedValue(mockResponse);

    await store.dispatch(
      fetchRegister({
        email: 'test@example.com',
        password: 'password',
        name: 'Ranel'
      })
    );

    const state = store.getState().registerReducer;
    expect(state.sending).toBe(false);
    expect(state.isRegistered).toBe(true);
    expect(state.error).toBe('');
  });

  test('should handle rejected state', async () => {
    const errorMessage = 'Registration failed';
    const authSpy = jest
      .spyOn(api, 'registerUserApi')
      .mockRejectedValue(new Error(errorMessage));

    await store.dispatch(
      fetchRegister({
        email: 'test@example.com',
        password: 'password',
        name: 'Ranel'
      })
    );

    const state = store.getState().registerReducer;
    expect(state.sending).toBe(false);
    expect(state.isRegistered).toBe(false);
    expect(state.error).toBe(errorMessage);
  });
});
