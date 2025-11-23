import { combineReducers, configureStore } from '@reduxjs/toolkit';

import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook
} from 'react-redux';


import ingredientsReducer from '../slices/ingredientsSlice'
import constructorReducer  from '../slices/ingredientsConstructorSlice'
import registerReducer from '../slices/authSlice'
import loginReducer from '../slices/loginSlice'
import userInfoReducer from '../slices/userInfoSlice'
import orderReducer from '../slices/orderSlice'
import feedReducer from '../slices/feedSlice'

export const rootReducer = combineReducers({
	ingredients: ingredientsReducer,
	constructorReducer: constructorReducer,
	registerReducer: registerReducer,
	loginReducer: loginReducer,
	userInfoReducer:  userInfoReducer,
	orderReducer: orderReducer,
	feedReducer: feedReducer,
})



const store = configureStore({
	reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production',
});

export type RootState = ReturnType<typeof rootReducer>;

export type AppDispatch = typeof store.dispatch;

export const useDispatch: () => AppDispatch = () => dispatchHook();
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;

export default store; 
