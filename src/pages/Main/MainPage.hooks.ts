import { useEffect, useRef } from 'react';

import { Filters, UpdatedFilters } from '../../types/types';

export const useFirstLoading = ({
  filters,
  getVacancies,
}: {
  filters: Filters;
  getVacancies: (updatedFilters: UpdatedFilters) => Promise<void>;
}) => {
  const isInitialized = useRef(false);

  useEffect(() => {
    if (!isInitialized.current) {
      isInitialized.current = true;
      getVacancies(filters);
    }
  }, [filters, getVacancies]);
};
