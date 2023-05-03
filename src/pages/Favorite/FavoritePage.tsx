import React, { useCallback, useEffect, useRef, useState } from 'react';
import ReactPaginate from 'react-paginate';

import VacancyList from '../../components/VacancyList/VacancyList';
import ChevronRightIcon from '../../components/Icons/Chevron/ChevronRightIcon';
import ChevronLeftIcon from '../../components/Icons/Chevron/ChevronLeftIcon';
import NotFoundPage from '../NotFound/NotFoundPage';
import Loader from '../../components/Loader/Loader';

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

  const fetchVacancies = useCallback(async (page: number) => {
    const responseFavorites: { objects: Vacancy[]; total: number } | null =
      await superjobService.getFavorites({
        ids: favorites.current,
        page: page,
      });

    if (responseFavorites === null) {
      setVacancies(null);
      setTotalPages(0);
      return;
    }

    setVacancies(responseFavorites.objects);
    setTotalPages(calcPages(responseFavorites.total));
  }, []);

  const requestFavorites = useCallback(
    async (page: number) => {
      setPage(page);
      setIsFavoriteLoading(true);
      await fetchVacancies(page);
      setIsFavoriteLoading(false);
    },
    [fetchVacancies]
  );

  const isInitialized = useRef(false);

  useEffect(() => {
    if (!isInitialized.current) {
      isInitialized.current = true;
      requestFavorites(0);
    }
  }, [requestFavorites]);

  const [isChangePage, setIsChangePage] = useState(false);

  const onPageChange = useCallback(
    async (p: { selected: number }) => {
      setIsChangePage(true);
      await fetchVacancies(p.selected);
      setIsChangePage(false);
    },
    [fetchVacancies]
  );

  return (
    <>
      {isFavoriteLoading ? (
        <Loader />
      ) : (
        <>
          {vacancies === null ? (
            <NotFoundPage />
          ) : (
            <section className={styles.section}>
              {isChangePage ? (
                <Loader />
              ) : (
                <VacancyList vacancies={vacancies} />
              )}

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
                  onPageChange={onPageChange}
                />
              )}
            </section>
          )}
        </>
      )}
    </>
  );
};

export default React.memo(FavoritePage);
