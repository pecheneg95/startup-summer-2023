import React, { useCallback, useState } from 'react';

import IndustrySelect from './IndustrySelect';
import ApplyFiltersButton from './ApplyFiltersButton';
import Salary from './Salary';
import CrossIcon from 'components/Icons/CrossIcon/CrossIcon';

import { Industry, UpdatedFilters } from 'types/types';

import styles from './FilterBar.module.scss';

const DEFAULT_FILTERS = {
  catalogues: null,
  payment_from: 0,
  payment_to: 0,
};

const FilterBar = ({
  onUpdateFilters,
  onApplyFilters,
  industries,
}: {
  onUpdateFilters: (updatedFilters: UpdatedFilters) => void;
  onApplyFilters: () => void;
  industries: Industry[];
}) => {
  const [indusrty, setIndustry] = useState<number | null>(null);
  const [salaryFrom, setSalaryFrom] = useState(0);
  const [salaryTo, setSalaryTo] = useState(0);

  const updateIndusrty = useCallback(
    (newIndustry: number | null) => {
      setIndustry(newIndustry);
      onUpdateFilters({ catalogues: newIndustry });
    },
    [onUpdateFilters]
  );

  const updateSalaryFrom = useCallback(
    (from: number) => {
      setSalaryFrom(from);
      onUpdateFilters({ payment_from: from });
    },
    [onUpdateFilters]
  );

  const updateSalaryTo = useCallback(
    (to: number) => {
      setSalaryTo(to);
      onUpdateFilters({ payment_to: to });
    },
    [onUpdateFilters]
  );

  const resetFilters = useCallback(() => {
    setIndustry(null);
    setSalaryFrom(0);
    setSalaryTo(0);

    onUpdateFilters(DEFAULT_FILTERS);
  }, [onUpdateFilters]);

  const onClickApplyFiltersButton = useCallback(() => {
    onUpdateFilters({
      catalogues: indusrty,
      payment_from: salaryFrom,
      payment_to: salaryTo,
      page: 0,
    });

    onApplyFilters();
  }, [onApplyFilters, indusrty, salaryFrom, salaryTo, onUpdateFilters]);

  return (
    <aside className={styles.filter}>
      <div className={styles.titleContainer}>
        <h2 className={styles.title}>Фильтры</h2>
        <button
          className={styles.reset}
          onClick={resetFilters}>
          <span>Сбросить всё</span>
          <CrossIcon color="none" />
        </button>
      </div>
      <IndustrySelect
        industries={industries}
        industry={indusrty}
        updateIndusrty={updateIndusrty}
      />
      <Salary
        salaryFrom={salaryFrom}
        salaryTo={salaryTo}
        updateSalaryFrom={updateSalaryFrom}
        updateSalaryTo={updateSalaryTo}
      />
      <ApplyFiltersButton onClick={onClickApplyFiltersButton} />
    </aside>
  );
};

export default React.memo(FilterBar);
