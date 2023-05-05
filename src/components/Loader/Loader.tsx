import { Loader as MantineLoader } from '@mantine/core';

import styles from './Loader.module.scss';

const Loader = () => {
  return (
    <div className={styles.loaderContainer}>
      <MantineLoader size="xl" />
    </div>
  );
};

export default Loader;
