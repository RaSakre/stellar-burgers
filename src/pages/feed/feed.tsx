import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC } from 'react';
import { useSelector, useDispatch } from '../../services/store';
import { useEffect } from 'react';
import { getFeedOrders } from '../../slices/feedSlice';

export const Feed: FC = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getFeedOrders());
  }, [dispatch]);
  /** TODO: взять переменную из стора */
  const orders: TOrder[] = useSelector((state) => state.feedReducer.ordersFeed);
  if (!orders.length) {
    return <Preloader />;
  }
  return (
    <FeedUI
      orders={orders}
      handleGetFeeds={() => {
        dispatch(getFeedOrders());
      }}
    />
  );
};