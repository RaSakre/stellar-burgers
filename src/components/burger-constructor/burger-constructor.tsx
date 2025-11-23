import { FC, useMemo } from 'react';
import { BurgerConstructorUI } from '@ui';
import { useSelector, useDispatch } from '../../services/store';
import { orderAddToFeed, filterOrdersFeedByIds } from '../../slices/feedSlice';
import { orderBurgerApi } from '@api';
import {
  orderRequestStatus,
  orderModalDataChanges
} from '../../slices/orderSlice';
import { clearConstructor } from '../../slices/ingredientsConstructorSlice';
import { useNavigate } from 'react-router-dom';

export const BurgerConstructor: FC = () => {
	const navigate = useNavigate()
  const isAuthenticated = useSelector(
    (state) => state.loginReducer.isAuthenticated
  );
  const dispatch = useDispatch();
  const constructorItems = useSelector(
    (state) => state.constructorReducer.ingredientsConstructor
  );
  const orderRequest = useSelector((state) => state.orderReducer.orderRequest);
  const orderModalData = useSelector(
    (state) => state.orderReducer.orderModalData
  );
  const ingredientsIds = [
    constructorItems.bun._id,
    ...constructorItems.ingredients.map((el) => el._id),
    constructorItems.bun._id
  ];
  const onOrderClick = () => {
    if (!constructorItems.bun || orderRequest) return
		if (!isAuthenticated){
			navigate('login', {
				replace: true
				});
			}
		else {
      orderBurgerApi(ingredientsIds).then((res) => {
        dispatch(orderModalDataChanges(res.order));
        dispatch(orderAddToFeed(res.order));
        dispatch(filterOrdersFeedByIds(ingredientsIds));
        dispatch(clearConstructor());
      });
      dispatch(orderRequestStatus(true));
    }
  };
  const closeOrderModal = () => {
    dispatch(orderRequestStatus(false));
    dispatch(orderModalDataChanges({}));
  };
  const price = useMemo(
    () =>
      (constructorItems.bun ? constructorItems.bun.price * 2 : 0) +
      constructorItems.ingredients.reduce(
        (s: number, v) => (v && typeof v.price === 'number' ? s + v.price : s),
        0
      ),
    [constructorItems]
  );
  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={constructorItems}
      orderModalData={orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};
