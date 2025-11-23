import { FC, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { ProfileMenuUI } from '@ui';
import { logoutApi } from '@api';
import { NotFound404 } from '@pages';
import { deleteUserData } from '../../slices/userInfoSlice';
import { useDispatch, useSelector } from '../../services/store';
import { logOutParam } from '../../slices/loginSlice';
import { deleteCookie } from '../../utils/cookie'

export const ProfileMenu: FC = () => {
	const isAuthenticated = useSelector(state => state.loginReducer.isAuthenticated)
	
	const dispatch = useDispatch()
  const { pathname } = useLocation();

  const handleLogout = () => {
    logoutApi().then((res) => {
      if (res.success) {
        dispatch(logOutParam(false))
				dispatch(deleteUserData({email: '', name: ''}))
				localStorage.clear()
				deleteCookie('accessToken')
      } else {
				<NotFound404/>
			}
    });
  };
	if (!isAuthenticated) {
		return <Navigate to={'/login'}/>
	}

  return <ProfileMenuUI handleLogout={handleLogout} pathname={pathname} />;
};
