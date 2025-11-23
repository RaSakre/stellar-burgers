import React, { FC } from 'react';
import styles from './app-header.module.css';
import { NavLink, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { TAppHeaderUIProps } from './type';
import {
  BurgerIcon,
  ListIcon,
  Logo,
  ProfileIcon
} from '@zlden/react-developer-burger-ui-components';

export const AppHeaderUI: FC<TAppHeaderUIProps> = ({ userName }) => {
  const location = useLocation();
  const [active, setActive] = useState(false);
  const [profileActive, setProfileActive] = useState(false);
  const [ordersActive, setOrdersActive] = useState(false);

  useEffect(() => {
    if (location.pathname === '/') {
      setActive(true);
      setProfileActive(false);
      setOrdersActive(false);
    } else if (location.pathname === '/profile') {
      setProfileActive(true);
      setActive(false);
      setOrdersActive(false);
    } else if (location.pathname === '/feed') {
      setOrdersActive(true);
      setActive(false);
      setProfileActive(false);
    } else {
      setActive(false);
    }
  }, [location.pathname]);

  return (
    <header className={styles.header}>
      <nav className={`${styles.menu} p-4`}>
        <div className={styles.menu_part_left}>
          <>
            <BurgerIcon type={active ? 'primary' : 'secondary'} />
            <p>
              <NavLink
                to='/'
                style={({ isActive }) => ({
                  color: isActive ? 'white' : '#8585ad',
                  textDecoration: 'none'
                })}
                className='text text_type_main-default ml-2 mr-10'
              >
                Конструктор
              </NavLink>
            </p>
          </>
          <>
            <ListIcon type={ordersActive ? 'primary' : 'secondary'} />
            <p>
              {' '}
              <NavLink
                to='/feed'
                style={({ isActive }) => ({
                  color: isActive ? 'white' : '#8585ad',
                  textDecoration: 'none'
                })}
                className='text text_type_main-default ml-2'
              >
                Лента заказов{' '}
              </NavLink>
            </p>
          </>
        </div>
        <div> <NavLink to={'/'} className={styles.logo}> 
          <Logo className='' />
					</NavLink>
        </div>
        <div className={styles.link_position_last}>
          <ProfileIcon type={profileActive ? 'primary' : 'secondary'} />
          <p>
            <NavLink
              to='/profile'
              style={({ isActive }) => ({
                color: isActive ? 'white' : '#8585ad',
                textDecoration: 'none'
              })}
              className='text text_type_main-default ml-2'
            >
              {userName || 'Личный кабинет'}
            </NavLink>
          </p>
        </div>
      </nav>
    </header>
  );
};
