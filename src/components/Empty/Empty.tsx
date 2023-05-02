import React from 'react';

import styles from './Empty.module.scss';

import detective from './../../assets/images/detective.webp';

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
