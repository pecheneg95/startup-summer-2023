import React, { useCallback } from 'react';
import { NumberInput } from '@mantine/core';

import styles from './Salary.module.scss';

const NUMBER_INPUT_STYLES = {
  input: {
    padding: '8px 24px 8px 12px',
    fontFamily: 'Inter',
    fontStyle: 'normal' as const,
    fontWeight: 'normal' as const,
    fontSize: '14px',
    lineHeight: '20px',
    color: '#232134',
    caretColor: '#5E96FC',
    '&::placeholder': {
      color: '#ACADB9',
    },
  },
  rightSection: {
    width: '36px',
    padding: '8px',
    display: 'flex' as const,
    flexDirection: 'column' as const,
    justifyContent: 'center' as const,
    alignItems: 'center' as const,
  },
  control: {
    cursor: 'pointer',
    margin: '0',
    width: '14px',
    height: '12px',
    border: 'none' as const,
    color: '#ACADB9',
    '&:hover': {
      color: '#92C1FF',
    },
    '&:active': {
      color: '#5E96FC',
    },
  },
};

function Salary({
  salaryFrom,
  salaryTo,
  updateSalaryFrom,
  updateSalaryTo,
}: {
  salaryFrom: number | '';
  salaryTo: number | '';
  updateSalaryFrom: (from: number) => void;
  updateSalaryTo: (to: number) => void;
}) {
  const onChangeSalaryFrom = useCallback(
    (value: number | '') => {
      const from = value || 0;

      updateSalaryFrom(from);
    },
    [updateSalaryFrom]
  );

  const onChangeSalaryTo = useCallback(
    (value: number | '') => {
      const to = value || 0;

      updateSalaryTo(to);
    },
    [updateSalaryTo]
  );

  return (
    <div className={styles.container}>
      <h3 className={styles.header}>Оклад</h3>
      <NumberInput
        data-elem="salary-from-input"
        defaultValue={0}
        value={salaryFrom === 0 ? '' : salaryFrom}
        placeholder="От"
        type="number"
        min={0}
        step={1000}
        size="md"
        radius="md"
        onChange={onChangeSalaryFrom}
        styles={NUMBER_INPUT_STYLES}
      />
      <NumberInput
        data-elem="salary-to-input"
        defaultValue={0}
        value={salaryTo === 0 ? '' : salaryTo}
        placeholder="До"
        type="number"
        min={0}
        step={1000}
        size="md"
        radius="md"
        onChange={onChangeSalaryTo}
        styles={NUMBER_INPUT_STYLES}
      />
    </div>
  );
}

export default React.memo(Salary);
