import React, { useEffect } from 'react';
import { useCallback, useState } from 'react';
import ReactPaginate from 'react-paginate';

import FilterBar from './../../components/FilterBar/FilterBar';
import SearchBar from './../../components/SearchBar/SearchBar';
import VacancyList from './../../components/VacancyList/VacancyList';
import Empty from '../../components/Empty/Empty';
import ChevronRightIcon from '../../components/Icons/Chevron/ChevronRightIcon';
import ChevronLeftIcon from '../../components/Icons/Chevron/ChevronLeftIcon';
import Loader from '../../components/Loader/Loader';

import { useFirstLoading } from './MainPage.hooks';

import superjobService from '../../services/superjob.service';
import calcPages from '../../helpers/calcPages';

import {
  Filters,
  Industry,
  UpdatedFilters,
  Vacancy,
} from './../../types/types';

import styles from './MainPage.module.scss';

const DEFAULT_FILTERS: Filters = {
  keyword: '',
  catalogues: null,
  payment_from: 0,
  payment_to: 0,
  page: 0,
};

const MainPage = () => {
  const [filters, setFilters] = useState<Filters>(DEFAULT_FILTERS);

  const updateFilters = useCallback(
    (updatedFilters: UpdatedFilters) => {
      setFilters({ ...filters, ...updatedFilters });
    },
    [filters]
  );

  const [vacancies, setVacancies] = useState<Vacancy[] | null>(null);
  const [totalPages, setTotalPages] = useState(0);

  const fetchVacancies = useCallback(
    async (updatedFilters: UpdatedFilters) => {
      const filter = { ...filters, ...updatedFilters };
      setFilters(filter);

      const responseVacancies = await superjobService.getVacancies(filter);

      if (
        responseVacancies &&
        responseVacancies.objects &&
        responseVacancies.total
      ) {
        setVacancies(responseVacancies.objects);
        setTotalPages(calcPages(responseVacancies.total));
        return;
      }

      setVacancies(null);
      setTotalPages(0);
    },
    [filters]
  );

  const [isVacanciesLoading, setIsVacanciesLoading] = useState(true);

  const getVacancies = useCallback(
    async (updatedFilters: UpdatedFilters) => {
      setIsVacanciesLoading(true);
      await fetchVacancies(updatedFilters);
      setIsVacanciesLoading(false);
    },
    [fetchVacancies]
  );

  useFirstLoading({ filters, getVacancies });

  const [isIndustriesLoading, setIsIndustriesLoading] = useState(true);

  const [industries, setIndustries] = useState<Industry[] | null>(null);

  useEffect(() => {
    const fetchIndustries = async () => {
      setIsIndustriesLoading(true);
      setIndustries(await superjobService.getIndustries());
      setIsIndustriesLoading(false);
    };

    fetchIndustries();
  }, []);

  const applyFilters = useCallback(() => {
    updateFilters({ page: 0 });
    getVacancies({ ...filters, page: 0 });
  }, [filters, getVacancies, updateFilters]);

  const [isChangePage, setIsChangePage] = useState(false);

  const onPageChange = useCallback(
    async (p: { selected: number }) => {
      setIsChangePage(true);
      await fetchVacancies({ page: p.selected });
      setIsChangePage(false);
    },
    [fetchVacancies]
  );

  const onChangeSearch = (text: string) => {
    updateFilters({ keyword: text });
  };

  return (
    <div className={styles.mainPage}>
      {isIndustriesLoading ? (
        <Loader />
      ) : (
        <>
          {industries && (
            <FilterBar
              onUpdateFilters={updateFilters}
              onApplyFilters={applyFilters}
              industries={industries}
            />
          )}

          <section className={styles.section}>
            <SearchBar
              onChange={onChangeSearch}
              onSearch={applyFilters}
            />
            {isVacanciesLoading ? (
              <Loader />
            ) : (
              <div className={styles.resultContainer}>
                {isChangePage ? (
                  <Loader />
                ) : vacancies === null ? (
                  <Empty />
                ) : (
                  <div className={styles.listContainer}>
                    <VacancyList vacancies={vacancies} />
                  </div>
                )}
                {totalPages > 1 && (
                  <ReactPaginate
                    pageCount={totalPages}
                    pageRangeDisplayed={3}
                    marginPagesDisplayed={0}
                    forcePage={filters.page}
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
              </div>
            )}
          </section>
        </>
      )}
    </div>
  );
};

export default React.memo(MainPage);
