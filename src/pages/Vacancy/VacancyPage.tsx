import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import classNames from 'classnames';
import { Loader, StarIcon } from '@mantine/core';

import LocationIcon from '../../components/Icons/Location/LocationIcon';
import NotFoundPage from '../NotFound/NotFoundPage';

import superjobService from '../../services/superjob.service';
import {
  deleteLocalStorageFavorite,
  isLocalStorageFavorite,
  setLocalStorageFavorite,
} from '../../services/localStorageFavorites';

import { formatSalaryText } from '../../helpers/formatSalary';
import createMarkup from '../../helpers/createMarkup';

import { Vacancy } from '../../types/types';

import styles from './VacancyPage.module.scss';

const VacancyPage = () => {
  const [isVacancyLoading, setIsVacancyLoading] = useState(true);
  const [vacancy, setVacancy] = useState<Vacancy | null>(null);
  const id = Number(useParams().id);

  const getVacancyData = useCallback(async () => {
    const fetchVacancies = async () => {
      setIsVacancyLoading(true);
      const responseVacancy = await superjobService.getVacancy(id);
      setIsVacancyLoading(false);

      setVacancy(responseVacancy);
    };

    fetchVacancies();
  }, [id]);

  const isInitialized = useRef(false);

  useEffect(() => {
    if (!isInitialized.current) {
      isInitialized.current = true;
      getVacancyData();
    }
  }, [getVacancyData]);

  const [isInFavorite, setInFavorite] = useState(isLocalStorageFavorite(id));

  const toggleFavorite = useCallback(() => {
    isInFavorite ? deleteLocalStorageFavorite(id) : setLocalStorageFavorite(id);
    setInFavorite(!isInFavorite);
  }, [id, isInFavorite]);

  return (
    <>
      {isVacancyLoading ? (
        <div className={styles.loaderContainer}>
          <Loader size="xl" />
        </div>
      ) : (
        <>
          {vacancy !== null ? (
            <section className={styles.section}>
              <div
                className={styles.shortDescription}
                data-elem={`vacancy-${id}`}>
                <h2 className={styles.header}>{vacancy.profession}</h2>
                <div className={styles.subtitle}>
                  <span className={styles.salary}>
                    {formatSalaryText(vacancy)}
                  </span>
                  <span className={styles.separator}>•</span>
                  <span className={styles.time}>
                    {vacancy.type_of_work.title}
                  </span>
                </div>
                <div className={styles.location}>
                  <LocationIcon color="#ACADB9" />
                  <span className={styles.locationText}>
                    {vacancy.town.title}
                  </span>
                </div>
                <div
                  className={
                    !!isInFavorite
                      ? classNames(styles.active, styles.favorite)
                      : styles.favorite
                  }
                  onClick={toggleFavorite}>
                  <StarIcon
                    color="none"
                    data-elem={`vacancy-${vacancy.id}-shortlist-button`}
                  />
                </div>
              </div>

              <div className={styles.descriptionContainer}>
                <div
                  className={styles.richText}
                  dangerouslySetInnerHTML={createMarkup(vacancy)}
                />
              </div>
            </section>
          ) : (
            <NotFoundPage />
          )}
        </>
      )}
    </>
  );
};

export default React.memo(VacancyPage);