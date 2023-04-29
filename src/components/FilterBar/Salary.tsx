import React from 'react';
import { NumberInput } from '@mantine/core';

import { UpdatedFilters } from '../../types/types';

import styles from "./Salary.module.scss"

const NUMBER_INPUT_STYLES = {
  input: {
    padding: "8px 24px 8px 12px",
    fontFamily: 'Inter',
    fontStyle: "normal" as const,
    fontWeight: "normal" as const,
    fontSize: "14px",
    lineHeight: "20px",
    color: "#232134",
    caretColor: "#5E96FC",
    '&::placeholder': {
      color: "#ACADB9"
    }
  },
  rightSection: {
    width: "36px",
    padding: "8px",
    display: "flex" as const,
    flexDirection: "column" as const,
    justifyContent: "center" as const,
    alignItems: "center" as const,
  },
  control: {
    cursor: "pointer",
    margin: "0",
    width: "14px",
    height: "12px",
    border: "none" as const,
    color: "#ACADB9",
    '&:hover': {
      color: "#92C1FF",
    },
    '&:active': {
      color: "#5E96FC",
    }
  },
}


function Salary({ salary, updateFilters }: { salary: { from: number, to: number }, updateFilters: (updatedFilters: UpdatedFilters) => void }) {
  return (
    <div className={styles.container}>
      <h3 className={styles.header}>Оклад</h3>
      <NumberInput
        data-elem="salary-from-input"
        defaultValue={""}
        value={salary.from === 0 ? "" : salary.from}
        placeholder="От"
        type="number"
        min={0}
        step={1000}
        size="md"
        radius="md"
        onChange={(value) => updateFilters({ payment_from: value === "" ? 0 : value })}
        styles={NUMBER_INPUT_STYLES}
      />
      <NumberInput
        data-elem="salary-to-input"
        defaultValue={""}
        value={salary.to === 0 ? "" : salary.to}
        placeholder="До"
        type="number"
        min={0}
        step={1000}
        size="md"
        radius="md"
        onChange={(value) => updateFilters({ payment_to: value === "" ? 0 : value })}
        styles={NUMBER_INPUT_STYLES}
      />
    </div>
  );
}

export default React.memo(Salary);