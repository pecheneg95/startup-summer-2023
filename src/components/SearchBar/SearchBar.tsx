import React from "react";

import { UpdatedFilters } from "../../types/types";

import styles from "./SearchBar.module.scss"

const SearchBar = ({ keyword, updateFilters, doRequest }: { keyword: string, updateFilters: (updatedFilters: UpdatedFilters) => void, doRequest: () => void }) => {

  const handleKeyPress = (event: { key: string; }) => {
    if (event.key === 'Enter') {
      updateFilters({ page: 0 })
      doRequest()
    }
  }

  return (
    <div className={styles.search}>
      <div className={styles.searchLine}>
        <input
          data-elem="search-input"
          className={styles.input}
          type="search"
          autoComplete="off"
          placeholder="Введите название вакансии"
          value={keyword}
          onKeyDown={handleKeyPress}
          onChange={(event) => updateFilters({ keyword: event.target.value === undefined ? "" : event.target.value })}>
        </input>
      </div>
      <button data-elem="search-button" className={styles.btn} onClick={() => {
        updateFilters({ page: 0 })
        doRequest()
      }}>
        Поиск
      </button>
    </div >
  )
}

export default React.memo(SearchBar);