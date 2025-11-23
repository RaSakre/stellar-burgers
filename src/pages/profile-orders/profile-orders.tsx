import { ProfileOrdersUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { getProfileOrders } from '../../slices/orderSlice';
import { useDispatch, useSelector } from '../../services/store';

export const ProfileOrders: FC = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getProfileOrders());
  }, [dispatch]);
  /** TODO: взять переменную из стора */
  const orders: TOrder[] = useSelector(
    (state) => state.orderReducer.ordersProfile
  );
  return <ProfileOrdersUI orders={orders} />;
};
