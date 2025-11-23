import { FC, useState, SyntheticEvent } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { useSelector } from '../../services/store';
import { forgotPasswordApi } from '@api';
import { ForgotPasswordUI } from '@ui-pages';

export const ForgotPassword: FC = () => {
  const isAuthenticated = useSelector(
    (state) => state.loginReducer.isAuthenticated
  );
  const [email, setEmail] = useState('');
  const [error, setError] = useState<Error | null>(null);
  const navigate = useNavigate();
  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    setError(null);
    forgotPasswordApi({ email })
      .then(() => {
        localStorage.setItem('resetPassword', 'true');
        navigate('/reset-password', { replace: true });
      })
      .catch((err) => setError(err));
  };
  if (isAuthenticated) {
    return <Navigate replace to={'/'} />;
  }
  return (
    <ForgotPasswordUI
      errorText={error?.message}
      email={email}
      setEmail={setEmail}
      handleSubmit={handleSubmit}
    />
  );
};
