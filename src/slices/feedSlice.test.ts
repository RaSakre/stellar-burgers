import { configureStore } from '@reduxjs/toolkit';
import reducer, {
  orderAddToFeed,
  filterOrdersFeedByIds,
  initialState,
  getFeedOrders,
  getOrderByNumber,
  getOrdersFeed,
  getOrdersFeedData
} from './feedSlice';
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
  }
];

const mockFeedOrders = [
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
  },
  {
    _id: '66f13200119d45001b50892c',
    ingredients: [
      '643d69a5c3f7b9001cfa093d',
      '643d69a5c3f7b9001cfa0941',
      '643d69a5c3f7b9001cfa093e',
      '643d69a5c3f7b9001cfa093e',
      '643d69a5c3f7b9001cfa0941',
      '643d69a5c3f7b9001cfa0941'
    ],
    status: 'done',
    name: 'Флюоресцентный люминесцентный био-марсианский бургер',
    createdAt: '2024-09-23T09:16:48.144Z',
    updatedAt: '2024-09-23T09:16:48.665Z',
    number: 53725
  }
];

const filteredByIds = [
  '643d69a5c3f7b9001cfa093d',
  '643d69a5c3f7b9001cfa093e',
  '643d69a5c3f7b9001cfa093d'
];

describe('feedSlice', () => {
  let store: any;

  beforeEach(() => {
    store = configureStore({
      reducer: {
        feedReducer: reducer
      }
    });
  });
  test('check if orderData is added to the store', () => {
    const action = orderAddToFeed(mockOrder);
    const newState = reducer({ ...initialState }, action);
    expect(newState.orderFeedData).toEqual(mockOrder);
  });
  test('filter orders by ids test', () => {
    const ingredientsIds = mockOrder.ingredients;
    const action = filterOrdersFeedByIds(ingredientsIds);
    const newState = reducer({ ...initialState }, action);
    expect(newState.orderFeedData.ingredients).toEqual(filteredByIds);
  });
});

describe('feedSlice async tests', () => {
  afterAll(() => {
    jest.restoreAllMocks();
  });
  let store: any;
  beforeEach(() => {
    store = configureStore({
      reducer: {
        feedReducer: reducer
      }
    });
  });
  test('getFeedOrders test', async () => {
    const mockFeedApi = jest
      .spyOn(api, 'getFeedsApi')
      .mockResolvedValue({
        success: true,
        total: 25000,
        totalToday: 140,
        orders: mockFeedOrders
      });
    await store.dispatch(getFeedOrders());
    const expectedResult = getOrdersFeed(store.getState());
    expect(mockFeedApi).toHaveBeenCalledTimes(1);
    expect(expectedResult).toEqual(mockFeedOrders);
  });
  test('getOrderByNumber test', async () => {
    const mockOrderNumber = jest
      .spyOn(api, 'getOrderByNumberApi')
      .mockResolvedValue({ success: true, orders: mockOrders });
    await store.dispatch(getOrderByNumber(1));
    const expectedResult = getOrdersFeedData(store.getState());
    expect(mockOrderNumber).toHaveBeenCalledTimes(1);
    expect(expectedResult).toEqual(mockOrder);
  });
});
