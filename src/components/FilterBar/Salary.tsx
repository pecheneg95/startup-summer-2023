import React, { useCallback } from 'react';

import NumberInput from 'components/NumberInput/NumberInput';
import { formatteNumberInput } from 'helpers/formatteNumberInput';

import styles from './Salary.module.scss';

function Salary({
  salaryFrom,
  salaryTo,
  updateSalaryFrom,
  updateSalaryTo,
}: {
  salaryFrom: number;
  salaryTo: number;
  updateSalaryFrom: (from: number) => void;
  updateSalaryTo: (to: number) => void;
}) {
  const onChangeSalaryFrom = useCallback(
    (value: string | number) => {
      const from = formatteNumberInput(value);

      updateSalaryFrom(from);
    },
    [updateSalaryFrom]
  );

  const onChangeSalaryTo = useCallback(
    (value: string | number) => {
      const to = formatteNumberInput(value);

      updateSalaryTo(to);
    },
    [updateSalaryTo]
  );

  return (
    <div className={styles.container}>
      <h3 className={styles.header}>Оклад</h3>
      <NumberInput
        value={salaryFrom}
        onChange={onChangeSalaryFrom}
        placeholder={'От'}
        dataElem="salary-from-input"
      />
      <NumberInput
        value={salaryTo}
        onChange={onChangeSalaryTo}
        placeholder={'До'}
        dataElem="salary-to-input"
      />
    </div>
  );
}

export default React.memo(Salary);
