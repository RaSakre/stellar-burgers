import {
  ConstructorPage,
  Feed,
  ForgotPassword,
  Login,
  NotFound404,
  Profile,
  ProfileOrders,
  Register,
  ResetPassword
} from '@pages';
import '../../index.css';
import styles from './app.module.css';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { ProtectedRoute } from '../protected-route/Protected-route';
import { AppHeader, IngredientDetails, Modal, OrderInfo } from '@components';
import { useDispatch } from '../../services/store';
import { useEffect } from 'react';
import { fetchUser } from '../../slices/userInfoSlice';
import { getCookie } from '../../utils/cookie';
import { setAuthState } from '../../slices/loginSlice';
import { fetchIngredients } from '../../slices/ingredientsSlice';

const App = () => {
	const location = useLocation()
	const background = location.state?.background;
  const dispatch = useDispatch();
  useEffect(() => {
    const accessToken = getCookie('accessToken');
    const refreshToken = localStorage.getItem('refreshToken');
		dispatch(fetchIngredients());
    if (accessToken && refreshToken) {
      dispatch(setAuthState(true));
      dispatch(fetchUser());
    } else {
      dispatch(setAuthState(false));
    }
  }, [dispatch]);
  const navigate = useNavigate();
  return (
    <div className={styles.app}>
      <AppHeader />
      <Routes location={background || location}>  
        <Route path='/' element={<ConstructorPage />} />
        <Route path='/feed' element={<Feed />} />
        <Route path='*' element={<NotFound404 />} />
        <Route
          path='/login'
          element={
            <ProtectedRoute >
              {' '}
              <Login />{' '}
            </ProtectedRoute>
          }
        />
        <Route
          path='/register'
          element={
            <ProtectedRoute>
              {' '}
              <Register />{' '}
            </ProtectedRoute>
          }
        />
        <Route
          path='/forgot-password'
          element={
            <ProtectedRoute>
              {' '}
              <ForgotPassword />{' '}
            </ProtectedRoute>
          }
        />
        <Route
          path='/reset-password'
          element={
            <ProtectedRoute>
              {' '}
              <ResetPassword />{' '}
            </ProtectedRoute>
          }
        />
        <Route path='/profile'>
          <Route
            index
            element={
              <ProtectedRoute>
                {' '}
                <Profile />{' '}
              </ProtectedRoute>
            }
          />
          <Route
            path='orders'
            element={
              <ProtectedRoute>
                {' '}
                <ProfileOrders />{' '}
              </ProtectedRoute>
            }
          />
        </Route>
      </Routes>
			{background && 
				<Routes>
					<Route
            path='/profile/orders/:number'
            element={
              <ProtectedRoute>
                <Modal title='Детали заказа' onClose={() => navigate(-1)}>
                  <OrderInfo />
                </Modal>
              </ProtectedRoute>
            }
          />
					<Route
          path='/ingredients/:id'
          element={
            <Modal title='Детали ингридиента' onClose={() => navigate(-1)}>
              <IngredientDetails />
            </Modal>
          }
        />
				<Route
          path='/feed/:number'
          element={
            <Modal title='Детали заказа' onClose={() => navigate(-1)}>
              <OrderInfo />
            </Modal>
          }
        />
				</Routes>
				}
    </div>
  );
};

export default App;
