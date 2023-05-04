import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';

import Logo from '../Icons/Logo/Logo';

import styles from './Layout.module.scss';

const setActive = ({ isActive }: { isActive: boolean }) =>
  isActive ? `${styles.active} ${styles.navLink}` : `${styles.navLink}`;

const Layout = () => {
  return (
    <>
      <header className={styles.header}>
        <div className={styles.headerWrapper}>
          <div className={styles.logo}>
            <Logo color={'#5E96FC'} />
            <span className={styles.text}>Jobored</span>
          </div>
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
    </>
  );
};

export default React.memo(Layout);