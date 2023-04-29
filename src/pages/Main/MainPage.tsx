import React from "react"
import { useCallback, useEffect, useRef, useState } from "react"
import ReactPaginate from "react-paginate"
import { Loader } from "@mantine/core"

import FilterBar from "./../../components/FilterBar/FilterBar"
import SearchBar from "./../../components/SearchBar/SearchBar"
import VacancyList from "./../../components/VacancyList/VacancyList"
import ChevronRightIcon from "../../components/Icons/Chevron/ChevronRightIcon"
import ChevronLeftIcon from "../../components/Icons/Chevron/ChevronLeftIcon"
import NotFoundPage from "../NotFound/NotFoundPage"

import { getIndustries, getVacancies } from "../../services/superjob.api"

import { Filters, Industry, UpdatedFilters, Vacancy } from "./../../types/types"

import styles from "./MainPage.module.scss"

const REPOS_ON_PAGE = 4;
const API_MAX_PAGES = 500;

const MainPage = () => {
  const [isVacanciesLoading, setIsVacanciesLoading] = useState(true)
  const [filters, setFilters] = useState<Filters>({
    keyword: "",
    catalogues: null,
    payment_from: 0,
    payment_to: 0,
    page: 0,
  })

  const updateFilters = useCallback((updatedFilters: UpdatedFilters) => {
    setFilters({ ...filters, ...updatedFilters })
  }, [filters])

  const [industries, setIndustries] = useState<[Industry]>([{ title: "null", key: 0 }]);

  useEffect(() => {
    const fetchIndustries = async () => {
      setIndustries(await getIndustries() as [Industry])
    }

    fetchIndustries();
  }, [])

  const [vacancies, setVacancies] = useState<Vacancy[] | null>(null)
  const [totalPages, setTotalPages] = useState(0)

  const doRequest = useCallback(async () => {
    const fetchVacancies = async () => {
      setIsVacanciesLoading(true)
      const responseVacancies = await getVacancies(filters)
      setIsVacanciesLoading(false)

      setVacancies(responseVacancies.objects)
      setTotalPages(Math.ceil(responseVacancies.total / REPOS_ON_PAGE) > API_MAX_PAGES ? API_MAX_PAGES : Math.ceil(responseVacancies.total / REPOS_ON_PAGE))
    }

    fetchVacancies();
  }, [filters])

  const isInitialized = useRef(false)

  useEffect(() => {
    if (!isInitialized.current) {
      isInitialized.current = true
      doRequest()
    }
  }, [doRequest])

  return (
    <div className={styles.mainPage}>
      <FilterBar filters={{ catalogues: filters.catalogues, payment_from: filters.payment_from, payment_to: filters.payment_to }} updateFilters={updateFilters} doRequest={doRequest} industries={industries} />
      <section className={styles.section}>
        <SearchBar keyword={filters.keyword} updateFilters={updateFilters} doRequest={doRequest} />
        {isVacanciesLoading ?
          <div className={styles.loaderContainer}> <Loader size="xl" /></div>
          :
          <div className={styles.resultContainer}>
            {vacancies === null ?
              <NotFoundPage />
              :
              <div className={styles.listContainer}><VacancyList vacancies={vacancies} /></div>
            }
            {totalPages > 1 &&
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
                onPageChange={(p) => {
                  updateFilters({ page: p.selected })
                  doRequest()
                }}
              />
            }
          </div>
        }
      </section>
    </div>
  )
}

export default React.memo(MainPage);