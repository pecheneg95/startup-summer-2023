import React, { useCallback, useState } from 'react';
import { Link } from 'react-router-dom';
import cn from 'classnames';

import StarIcon from 'icons/Star/StarIcon';
import LocationIcon from 'icons/Location/LocationIcon';

import {
  addFavorite,
  deleteFavorite,
  isFavorite,
} from 'services/favorites.service';
import { formatSalaryText } from 'helpers/formatSalary';

import { Vacancy } from 'types/types';

import styles from './VacancyItem.module.scss';

const VacancyItem = ({ content }: { content: Vacancy }) => {
  const [isInFavorite, setIsInFavorite] = useState(isFavorite(content.id));

  const toggleFavorite = useCallback(() => {
    if (isInFavorite) {
      deleteFavorite(content.id);
    } else {
      addFavorite(content.id);
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
      <button
        className={cn(isInFavorite && styles.active, styles.favorite)}
        data-elem={`vacancy-${content.id}-shortlist-button`}
        onClick={toggleFavorite}>
        <StarIcon color="none" />
      </button>
    </li>
  );
};

export default React.memo(VacancyItem);
