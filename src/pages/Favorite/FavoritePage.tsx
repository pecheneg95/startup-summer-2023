import React, { useCallback, useEffect, useRef, useState } from 'react';
import ReactPaginate from 'react-paginate';
import { Loader } from '@mantine/core';

import VacancyList from '../../components/VacancyList/VacancyList';
import ChevronRightIcon from '../../components/Icons/Chevron/ChevronRightIcon';
import ChevronLeftIcon from '../../components/Icons/Chevron/ChevronLeftIcon';
import NotFoundPage from '../NotFound/NotFoundPage';

import superjobService from '../../services/superjob.service';
import { getLocalStorageFavorites } from '../../services/localStorageFavorites';
import calcPages from '../../helpers/calcPages';

import { Vacancy } from '../../types/types';

import styles from './FavoritePage.module.scss';

const FavoritePage = () => {
  const [isFavoriteLoading, setIsFavoriteLoading] = useState(true);
  const favorites = useRef(getLocalStorageFavorites());
  const [page, setPage] = useState(0);
  const [vacancies, setVacancies] = useState<Vacancy[] | null>(null);
  const [totalPages, setTotalPages] = useState(0);

  const requestFavorites = useCallback(async (page: number) => {
    setPage(page);

    const fetchVacancies = async () => {
      setIsFavoriteLoading(true);
      const responseFavorites = await superjobService.getFavorites({
        ids: favorites.current,
        page: page,
      });
      setIsFavoriteLoading(false);

      if (responseFavorites === null) {
        return;
      }

      setVacancies(responseFavorites.objects);
      setTotalPages(calcPages(responseFavorites.total));
    };

    fetchVacancies();
  }, []);

  const isInitialized = useRef(false);

  useEffect(() => {
    if (!isInitialized.current) {
      isInitialized.current = true;
      requestFavorites(0);
    }
  }, [requestFavorites]);

  return (
    <>
      {isFavoriteLoading ? (
        <div className={styles.loaderContainer}>
          <Loader size={'xl'} />
        </div>
      ) : (
        <>
          {vacancies !== null ? (
            <section className={styles.section}>
              <VacancyList vacancies={vacancies} />

              {totalPages > 1 && (
                <ReactPaginate
                  pageCount={totalPages}
                  pageRangeDisplayed={3}
                  marginPagesDisplayed={0}
                  forcePage={page}
                  breakLabel={null}
                  nextLabel={<ChevronRightIcon color="none" />}
                  previousLabel={<ChevronLeftIcon color="none" />}
                  containerClassName={styles.paginateContainer}
                  pageClassName={styles.btn}
                  pageLinkClassName={styles.btnLink}
                  activeClassName={styles.activeBtn}
                  previousClassName={styles.previos}
                  nextClassName={styles.next}
                  disabledClassName={styles.inactive}
                  onPageChange={(p) => {
                    requestFavorites(p.selected);
                  }}
                />
              )}
            </section>
          ) : (
            <NotFoundPage />
          )}
        </>
      )}
    </>
  );
};

export default React.memo(FavoritePage);
