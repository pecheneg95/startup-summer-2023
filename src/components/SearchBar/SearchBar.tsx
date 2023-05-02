import React, { useCallback } from 'react';

import styles from './SearchBar.module.scss';

const SearchBar = ({
  onChange,
  onSearch,
}: {
  onChange: (text: string) => void;
  onSearch: () => void;
}) => {
  const onInputChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const keyword =
        event.target.value === undefined ? '' : event.target.value;

      onChange(keyword);
    },
    [onChange]
  );

  const onKeyDown = useCallback(
    (event: { key: string }) => {
      if (event.key === 'Enter') {
        onSearch();
      }
    },
    [onSearch]
  );

  return (
    <div className={styles.search}>
      <div className={styles.searchLine}>
        <input
          data-elem="search-input"
          className={styles.input}
          type="search"
          autoComplete="off"
          placeholder="Введите название вакансии"
          onKeyDown={onKeyDown}
          onChange={onInputChange}></input>
      </div>
      <button
        data-elem="search-button"
        className={styles.btn}
        onClick={onSearch}>
        Поиск
      </button>
    </div>
  );
};

export default React.memo(SearchBar);
