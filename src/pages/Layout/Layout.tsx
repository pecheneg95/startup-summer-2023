import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';

import Logo from '../../components/Icons/Logo/Logo';

import styles from './Layout.module.scss';
import './Layout.scss';

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
            {/* // TODO add higlits to nav link */}
            <NavLink
              className="navLink"
              to="/">
              Поиск Вакансий
            </NavLink>
            <NavLink
              className="navLink"
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
