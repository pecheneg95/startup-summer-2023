import React, { useCallback, useState } from 'react';
import { useAsyncValue, useParams } from 'react-router-dom';
import cn from 'classnames';
import { StarIcon } from '@mantine/core';

import NotFoundPage from 'pages/NotFound/NotFoundPage';
import LocationIcon from 'icons/Location/LocationIcon';

import {
  deleteFavorite,
  isFavorite,
  addFavorite,
} from 'services/favorites.service';

import { formatSalaryText } from 'helpers/formatSalary';
import createMarkup from 'helpers/createMarkup';

import { Vacancy } from 'types/types';

import styles from './VacancyPage.module.scss';

const VacancyLayout = () => {
  const vacancy = useAsyncValue() as Vacancy | null;
  const { id } = useParams();

  const [isInFavorite, setIsInFavorite] = useState(isFavorite(Number(id)));

  const toggleFavorite = useCallback(() => {
    if (isInFavorite) {
      deleteFavorite(Number(id));
    } else {
      addFavorite(Number(id));
    }

    setIsInFavorite(!isInFavorite);
  }, [id, isInFavorite]);

  return (
    <>
      {!vacancy ? (
        <NotFoundPage />
      ) : (
        <section className={styles.section}>
          <div
            className={styles.shortDescription}
            data-elem={`vacancy-${id}`}>
            <h2 className={styles.header}>{vacancy.profession}</h2>
            <div className={styles.subtitle}>
              <span className={styles.salary}>{formatSalaryText(vacancy)}</span>
              <span className={styles.separator}>•</span>
              <span className={styles.time}>{vacancy.type_of_work.title}</span>
            </div>
            <div className={styles.location}>
              <LocationIcon color="#ACADB9" />
              <span className={styles.locationText}>{vacancy.town.title}</span>
            </div>
            <button
              className={cn(isInFavorite && styles.active, styles.favorite)}
              data-elem={`vacancy-${vacancy.id}-shortlist-button`}
              onClick={toggleFavorite}>
              <StarIcon color="none" />
            </button>
          </div>

          <div className={styles.descriptionContainer}>
            <div
              className={styles.richText}
              dangerouslySetInnerHTML={{ __html: createMarkup(vacancy) }}
            />
          </div>
        </section>
      )}
    </>
  );
};

export default React.memo(VacancyLayout);
