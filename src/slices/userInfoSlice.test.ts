import { configureStore } from '@reduxjs/toolkit';
import reducer, {
  deleteUserData,
  changeUserInfo,
  initialState,
  fetchUser,
  getUser
} from './userInfoSlice';
import * as api from '../utils/burger-api';

const mockUserInfo = {
  email: 'rn@yandex.ru',
  name: 'Ranel',
  password: '123'
};

describe('userInfoSlice', () => {
  test('deleteUserData test', () => {
    const action = deleteUserData({ email: '', name: '' });
    const newState = reducer(
      { ...initialState, user: { email: 'rn@yandex.ru', name: 'Ranel' } },
      action
    );
    expect(newState.user).toEqual({ email: '', name: '' });
  });
  test('changeUserInfo test', () => {
    const action = changeUserInfo({ email: 'Rn@yandex.ru', name: 'Ranelka' });
    const newState = reducer(
      { ...initialState, user: { email: 'rn@yandex.ru', name: 'Ranel' } },
      action
    );
    expect(newState.user).toEqual({ email: 'Rn@yandex.ru', name: 'Ranelka' });
  });
});

describe('userInfoSlice async test', () => {
  let store: any;
  beforeEach(() => {
    store = configureStore({
      reducer: {
        userInfoReducer: reducer
      }
    });
  });
  afterAll(() => {
    jest.restoreAllMocks();
  });
  test('async test', async () => {
    const mockGetUserApi = jest
      .spyOn(api, 'getUserApi')
      .mockResolvedValue({ user: mockUserInfo, success: true });
    await store.dispatch(fetchUser());
    const expectedResult = getUser(store.getState());
    expect(mockGetUserApi).toHaveBeenCalledTimes(1);
    expect(expectedResult).toEqual(mockUserInfo);
  });
});
