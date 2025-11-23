import { FC, SyntheticEvent, useState } from 'react';
import { RegisterUI } from '@ui-pages';
import { useDispatch, useSelector } from '../../services/store';
import { fetchRegister, setFormValues } from '../../slices/authSlice';
import { Navigate } from 'react-router-dom';
import { Preloader } from '@ui';

export const Register: FC = () => {
  const errorMessage = useSelector((state) => state.registerReducer.error);
  const isAuthenticated = useSelector(
    (state) => state.loginReducer.isAuthenticated
  );
  const isRegistered = useSelector(
    (state) => state.registerReducer.isRegistered
  );
  const sending = useSelector((state) => state.registerReducer.sending);
  const dispatch = useDispatch();
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    dispatch(setFormValues({ field: 'name', value: userName }));
    dispatch(setFormValues({ field: 'email', value: email }));
    dispatch(setFormValues({ field: 'password', value: password }));
    dispatch(
      fetchRegister({ name: userName, email: email, password: password })
    );
  };
  if (isAuthenticated) {
    return <Navigate replace to={'/'} />;
  }
  if (sending) {
    return <Preloader />;
  }
  if (isRegistered) {
    return <Navigate to={'/login'} />;
  }
  return (
    <RegisterUI
      errorText={errorMessage}
      email={email}
      userName={userName}
      password={password}
      setEmail={setEmail}
      setPassword={setPassword}
      setUserName={setUserName}
      handleSubmit={handleSubmit}
    />
  );
};