import React from 'react';

import VacancyItem from './VacancyItem';

import { Vacancy } from '../../types/types';

import styles from './VacancyList.module.scss';

const VacancyList = ({ vacancies }: { vacancies: Vacancy[] }) => {
  const items = vacancies.map((vacancy) => {
    return (
      <VacancyItem
        content={vacancy}
        key={vacancy.id}
      />
    );
  });

  return <ul className={styles.list}>{items}</ul>;
};

export default React.memo(VacancyList);
