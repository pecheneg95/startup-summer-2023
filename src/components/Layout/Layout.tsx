import React from 'react';
import { Link, NavLink, Outlet } from 'react-router-dom';

import Logo from 'icons/Logo/Logo';

import styles from './Layout.module.scss';
import { Toast } from 'components/Toast/Toast';

const setActive = ({ isActive }: { isActive: boolean }) =>
  isActive ? `${styles.active} ${styles.navLink}` : `${styles.navLink}`;

const Layout = () => {
  return (
    <>
      <header className={styles.header}>
        <div className={styles.headerWrapper}>
          <Link
            to="/vacancies"
            className={styles.logo}>
            <Logo color={'#5E96FC'} />
            <span className={styles.text}>Jobored</span>
          </Link>
          <nav className={styles.navigation}>
            <NavLink
              className={setActive}
              to="/vacancies">
              Поиск Вакансий
            </NavLink>
            <NavLink
              className={setActive}
              to="/favorite">
              Избранное
            </NavLink>
          </nav>
        </div>
      </header>

      <main className={styles.main}>
        <div className={styles.wrapper}>
          <Outlet />
        </div>
      </main>
      <Toast />
    </>
  );
};

export default React.memo(Layout);
