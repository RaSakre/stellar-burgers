import { ProfileUI } from '@ui-pages';
import { FC, SyntheticEvent, useEffect, useState } from 'react';
import { useSelector, useDispatch } from '../../services/store';
import { setFormValues } from '../../slices/authSlice';
import { updateUserApi } from '@api';
import { changeUserInfo } from '../../slices/userInfoSlice';

export const Profile: FC = () => {
  const dispatch = useDispatch();
  /** TODO: взять переменную из стора */
  const user = useSelector((state) => state.userInfoReducer.user);
  const [formValue, setFormValue] = useState({
    name: user.name,
    email: user.email,
    password: ''
  });
  useEffect(() => {
    setFormValue((prevState) => ({
      ...prevState,
      name: user?.name || '',
      email: user?.email || ''
    }));
  }, [user.email, user.name]);
  const isFormChanged =
    formValue.name !== user?.name ||
    formValue.email !== user?.email ||
    !!formValue.password;
  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    dispatch(setFormValues({ field: 'name', value: formValue.name }));
    dispatch(setFormValues({ field: 'email', value: formValue.email }));
    dispatch(setFormValues({ field: 'password', value: formValue.password }));
    updateUserApi(formValue).then((res) => {
      dispatch(changeUserInfo(res.user));
    });
  };
  const handleCancel = (e: SyntheticEvent) => {
    e.preventDefault();
    setFormValue({
      name: user.name,
      email: user.email,
      password: ''
    });
  };
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormValue((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }));
  };
  return (
    <ProfileUI
      formValue={formValue}
      isFormChanged={isFormChanged}
      handleCancel={handleCancel}
      handleSubmit={handleSubmit}
      handleInputChange={handleInputChange}
    />
  );
};
