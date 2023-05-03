import React from 'react';
import { Link } from 'react-router-dom';

import styles from './NotFoundPage.module.scss';

import detective from './../../assets/images/detective.webp';

const NotFoundPage = () => {
  return (
    <section className={styles.section}>
      <img
        className={styles.detective}
        alt="detective"
        src={detective}></img>
      <h3 className={styles.header}>Упс, здесь еще ничего нет!</h3>
      <Link
        to={`/vacancies`}
        className={styles.btnLink}>
        <button className={styles.btn}>Поиск Вакансий</button>
      </Link>
    </section>
  );
};

export default React.memo(NotFoundPage);
