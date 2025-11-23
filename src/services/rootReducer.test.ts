import { rootReducer } from './store';

// Пример начального состояния для редьюсеров (можно изменить в зависимости от вашего приложения)
const initialState = {
  ingredients: {
    ingredients: [],
    isIngredientsLoading: false
  },
  constructorReducer: {
    ingredientsConstructor: {
      bun: {
        calories: 0,
        carbohydrates: 0,
        fat: 0,
        image: '',
        image_large: '',
        image_mobile: '',
        name: '',
        price: 0,
        proteins: 0,
        type: '',
        _id: ''
      },
      ingredients: []
    }
  },
  registerReducer: {
    error: '',
    form: {
      name: '',
      email: '',
      password: ''
    },
    isRegistered: false,
    sending: false
  },
  loginReducer: {
    isAuthenticated: false,
    loginUserError: '',
    loginUserRequest: false,
    user: {
      email: '',
      name: ''
    }
  },
  userInfoReducer: {
    user: {
      email: '',
      name: ''
    }
  },
  orderReducer: {
    orderRequest: false,
    ordersProfile: [],
    orderModalData: {
      createdAt: '',
      ingredients: [],
      name: '',
      number: 0,
      status: '',
      updatedAt: '',
      _id: ''
    }
  },
  feedReducer: {
    feed: {
      total: 0,
      totalToday: 0
    },
    ordersFeed: [],
    ordersFeedIngredients: [],
    orderFeedData: {
      createdAt: '',
      ingredients: [],
      name: '',
      number: 0,
      status: '',
      updatedAt: '',
      _id: ''
    }
  }
};

// Ожидаемое состояние при вызове rootReducer с undefined состоянием
const expectedInitialState = initialState;

describe('rootReducer', () => {
  it('тест проверяющий правильную настройку rootReducer', () => {
    const unknownAction = { type: 'UNKNOWN_ACTION' };
    const result = rootReducer(undefined, unknownAction);
    expect(result).toEqual(expectedInitialState);
  });
});
