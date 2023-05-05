import React from 'react';

import detective from 'assets/images/detective.webp';

import styles from './Empty.module.scss';

const Empty = () => {
  return (
    <div className={styles.container}>
      <img
        className={styles.detective}
        alt="detective"
        src={detective}></img>
      <h3 className={styles.header}>{'Упс, ничего не нашлось('}</h3>
    </div>
  );
};

export default React.memo(Empty);
