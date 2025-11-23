import { FC, SyntheticEvent, useState } from 'react';
import { LoginUI } from '@ui-pages';
import { useDispatch, useSelector } from '../../services/store';
import { loginUser } from '../../slices/loginSlice';
import { Navigate, useLocation } from 'react-router-dom';
import { fetchUser } from '../../slices/userInfoSlice';
import { Preloader } from '@ui';

export const Login: FC = () => {
  const location = useLocation();
  const isAuthenticated = useSelector(state => state.loginReducer.isAuthenticated);
  const loginUserRequest = useSelector(state => state.loginReducer.loginUserRequest);
  const loginUserError = useSelector(state => state.loginReducer.loginUserError);
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    if (!email || !password) {
      return;
    }
    dispatch(loginUser({ email, password }));
  };
  if (loginUserRequest) {
    return <Preloader />;
  }
  if (isAuthenticated) {
    dispatch(fetchUser());
    const from = location.state?.from || '/'; 
    return <Navigate replace to={from} />;
  }
  return (
    <LoginUI
      errorText={loginUserError}
      email={email}
      setEmail={setEmail}
      password={password}
      setPassword={setPassword}
      handleSubmit={handleSubmit}
    />
  );
};
