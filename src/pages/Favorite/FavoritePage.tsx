import React, { useCallback, useEffect, useRef, useState } from "react"
import ReactPaginate from "react-paginate";
import { Loader } from "@mantine/core";

import VacancyList from "../../components/VacancyList/VacancyList"
import ChevronRightIcon from "../../components/Icons/Chevron/ChevronRightIcon";
import ChevronLeftIcon from "../../components/Icons/Chevron/ChevronLeftIcon";
import NotFoundPage from "../NotFound/NotFoundPage";

import { getFavorites } from "../../services/superjob.api"
import { getLocalStorageFavorites } from "../../services/favorites";

import { Vacancy } from "../../types/types";

import styles from "./FavoritePage.module.scss"

const REPOS_ON_PAGE = 4;
const API_MAX_PAGES = 500;

const FavoritePage = () => {
  const [isFavoriteLoading, setIsFavoriteLoading] = useState(true)
  const favorites = useRef(getLocalStorageFavorites())
  const [page, setPage] = useState(0);
  const [vacancies, setVacancies] = useState<Vacancy[] | null>(null)
  const [totalPages, setTotalPages] = useState(0)

  const doRequest = useCallback(async () => {
    const fetchVacancies = async () => {
      setIsFavoriteLoading(true)
      const responseVacancies = await getFavorites({ ids: favorites.current, page: page })
      setIsFavoriteLoading(false)

      if (responseVacancies === null) return

      setVacancies(responseVacancies.objects)
      setTotalPages(Math.ceil(responseVacancies.total / REPOS_ON_PAGE) > API_MAX_PAGES ? API_MAX_PAGES : Math.ceil(responseVacancies.total / REPOS_ON_PAGE))
    }

    fetchVacancies();
  }, [page])

  const isInitialized = useRef(false)

  useEffect(() => {
    if (!isInitialized.current) {
      isInitialized.current = true
      doRequest()
    }
  }, [doRequest])

  return (
    <>
      {isFavoriteLoading ?
        <div className={styles.loaderContainer}><Loader size={"xl"} /></div>
        :
        <>
          {vacancies !== null ?
            <section className={styles.section} >
              <VacancyList vacancies={vacancies} />
              {totalPages > 1 &&
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
                    setPage(p.selected)
                    doRequest()
                  }}
                />
              }
            </section >
            :
            <NotFoundPage />
          }
        </>
      }
    </>
  )
}

export default React.memo(FavoritePage);