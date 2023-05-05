import React, { useCallback, useState } from 'react';
import { Link } from 'react-router-dom';
import cn from 'classnames';

import StarIcon from 'components/Icons/Star/StarIcon';
import LocationIcon from 'components/Icons/Location/LocationIcon';

import {
  setLocalStorageFavorite,
  deleteLocalStorageFavorite,
  isLocalStorageFavorite,
} from 'services/localStorageFavorites';
import { formatSalaryText } from 'helpers/formatSalary';

import { Vacancy } from 'types/types';

import styles from './VacancyItem.module.scss';

const VacancyItem = ({ content }: { content: Vacancy }) => {
  const [isInFavorite, setIsInFavorite] = useState(
    isLocalStorageFavorite(content.id)
  );

  const toggleFavorite = useCallback(() => {
    if (isInFavorite) {
      deleteLocalStorageFavorite(content.id);
    } else {
      setLocalStorageFavorite(content.id);
    }

    setIsInFavorite(!isInFavorite);
  }, [content.id, isInFavorite]);

  return (
    <li
      className={styles.listItem}
      data-elem={`vacancy-${content.id}`}>
      <Link
        to={`/vacancies/${content.id}`}
        className={styles.routeLink}>
        <h3 className={styles.header}>{content.profession}</h3>
      </Link>
      <div className={styles.subtitle}>
        <span className={styles.salary}>{formatSalaryText(content)}</span>
        <span className={styles.separator}>•</span>
        <span className={styles.time}>{content.type_of_work.title}</span>
      </div>
      <div className={styles.location}>
        <LocationIcon color="#ACADB9" />
        <span className={styles.locationText}>{content.town.title}</span>
      </div>
      <div
        className={cn(isInFavorite && styles.active, styles.favorite)}
        onClick={toggleFavorite}>
        <StarIcon
          color="none"
          data-elem={`vacancy-${content.id}-shortlist-button`}
        />
      </div>
    </li>
  );
};

export default React.memo(VacancyItem);
