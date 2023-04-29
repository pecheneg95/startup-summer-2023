import React from "react"

import Indusrty from "./Industry"
import BtnApplyFilters from "./BtnApplyFilters"
import Salary from "./Salary"
import CrossIcon from "../Icons/CrossIcon/CrossIcon"

import { Industry, UpdatedFilters } from "../../types/types"

import styles from "./FilterBar.module.scss"

const FilterBar = ({ filters, updateFilters, doRequest, industries }: { filters: { catalogues: number | null, payment_from: number, payment_to: number }, updateFilters: (updatedFilters: UpdatedFilters) => void, doRequest: () => void, industries: [Industry] }) => {
  return (
    <aside className={styles.filter}>
      <div className={styles.titleContainer}>
        <h2 className={styles.title}>Фильтры</h2>
        <button className={styles.reset} onClick={() => updateFilters({ catalogues: null, payment_from: 0, payment_to: 0, page: 0 })}>
          <span>Сбросить всё</span>
          <CrossIcon color="none" />
        </button>
      </div>
      {industries === null ?
        <></> //TODO change for loader in parent component
        :
        <Indusrty industries={industries} catalogues={filters.catalogues} updateFilters={updateFilters} />
      }
      <Salary salary={{ from: filters.payment_from, to: filters.payment_to }} updateFilters={updateFilters} />
      <BtnApplyFilters doRequest={() => {
        updateFilters({ page: 0 })
        doRequest()
      }} />
    </aside >
  )
}

export default React.memo(FilterBar)