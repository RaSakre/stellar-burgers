import { configureStore } from '@reduxjs/toolkit';
import reducer, {
  orderRequestStatus,
  orderModalDataChanges,
  initialState,
  getProfileOrders,
  getProfileOrdersSelector
} from './orderSlice';
import * as api from '../utils/burger-api';

const mockOrder = {
  createdAt: '2024-09-23T09:35:42.227Z',
  ingredients: [
    '643d69a5c3f7b9001cfa093d',
    '643d69a5c3f7b9001cfa093e',
    '643d69a5c3f7b9001cfa093d'
  ],
  name: 'Флюоресцентный люминесцентный бургер',
  number: 53726,
  status: 'done',
  updatedAt: '2024-09-23T09:35:42.718Z',
  _id: '66f1366e119d45001b508939'
};

const mockOrders = [
  {
    _id: '66f13c91119d45001b508951',
    ingredients: ['643d69a5c3f7b9001cfa093e', '643d69a5c3f7b9001cfa093c'],
    status: 'done',
    name: 'Краторный люминесцентный бургер',
    createdAt: '2024-09-23T10:01:53.795Z',
    updatedAt: '2024-09-23T10:01:54.367Z',
    number: 53728
  },
  {
    _id: '66f13b8e119d45001b508944',
    ingredients: [
      '643d69a5c3f7b9001cfa0943',
      '643d69a5c3f7b9001cfa0945',
      '643d69a5c3f7b9001cfa0943',
      '643d69a5c3f7b9001cfa093c',
      '643d69a5c3f7b9001cfa093c'
    ],
    status: 'done',
    name: 'Краторный space антарианский бургер',
    createdAt: '2024-09-23T09:57:34.358Z',
    updatedAt: '2024-09-23T09:57:34.868Z',
    number: 53727
  },
  {
    _id: '66f1366e119d45001b508939',
    ingredients: [
      '643d69a5c3f7b9001cfa093d',
      '643d69a5c3f7b9001cfa093e',
      '643d69a5c3f7b9001cfa093d'
    ],
    status: 'done',
    name: 'Флюоресцентный люминесцентный бургер',
    createdAt: '2024-09-23T09:35:42.227Z',
    updatedAt: '2024-09-23T09:35:42.718Z',
    number: 53726
  }
];

const emptyMockOrder = {
  createdAt: '',
  ingredients: [],
  name: '',
  number: 0,
  status: '',
  updatedAt: '',
  _id: ''
};

describe('orderSlice', () => {
  test('orderRequestStatus test', () => {
    const action = orderRequestStatus(true);
    const newState = reducer({ ...initialState, orderRequest: false }, action);
    expect(newState.orderRequest).toBe(true);
  });
  test('orderModalDataChanges test', () => {
    const action = orderModalDataChanges(mockOrder);
    const newState = reducer(
      { ...initialState, orderModalData: emptyMockOrder },
      action
    );
    expect(newState.orderModalData).toEqual(mockOrder);
  });
});
describe('getProfileOrders async test', () => {
  let store: any;
  beforeEach(() => {
    store = configureStore({
      reducer: {
        orderReducer: reducer
      }
    });
  });
  afterAll(() => {
    jest.restoreAllMocks();
  });
  test('getProfileOrders test', async () => {
    const mockGetProfileOrders = jest
      .spyOn(api, 'getOrdersApi')
      .mockResolvedValue(mockOrders);
    await store.dispatch(getProfileOrders());
    const expectedResult = getProfileOrdersSelector(store.getState());
    expect(mockGetProfileOrders).toHaveBeenCalledTimes(1);
    expect(expectedResult).toEqual(mockOrders);
  });
});
