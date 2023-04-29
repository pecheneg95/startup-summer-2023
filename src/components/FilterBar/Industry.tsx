import React, { useState } from "react";
import { Select } from '@mantine/core';

import { ReactComponent as DownIcon } from './../../assets/icons/down.svg';
import UpIcon from "../Icons/UpIcon/UpIcon";

import { Industry as IndustryType, UpdatedFilters } from "../../types/types";

import styles from "./Industry.module.scss"

const SELECT_STYLES = {
  root: {
    width: "275px",
    marginTop: "8px",
    display: "flex" as const,
    flexDirection: "column" as const,
    gap: "8px",
  },
  input: {
    height: "42px",
    padding: "11px 36px 11px 12px",
    fontFamily: 'Inter',
    fontStyle: "normal" as const,
    fontWeight: "normal" as const,
    fontSize: "14px",
    lineHeight: "20px",
    overflow: "hidden" as const,
    textOverflow: "ellipsis" as const,
    '&::placeholder': {
      fontFamily: 'Inter',
      fontStyle: "normal" as const,
      fontWeight: "normal" as const,
      fontSize: "14px",
      lineHeight: "20px",
      color: "#ACADB9",
    }
  },
  dropdown: {
    borderRadius: "8px",
  },
  item: {
    width: "260px",
    height: "36px",
    padding: "8px",
    fontFamily: 'Inter',
    fontStyle: "normal" as const,
    fontWeight: "normal" as const,
    fontSize: "14px",
    lineHeight: "20px",
    color: "#232134",
    textOverflow: "ellipsis" as const,
    overflow: "hidden" as const,
    '&[data-selected]': {
      backgroundColor: "#5E96FC",
      '&, &:hover': {
        backgroundColor: "#5E96FC",
      },
    },
    '&[data-hovered]': {
      backgroundColor: "#DEECFF",
    },
  },
  rightSection: { pointerEvents: 'none' as const },
}

const Industry = ({ industries, catalogues, updateFilters }: { industries: [IndustryType], catalogues: number | null, updateFilters: (updatedFilters: UpdatedFilters) => void }) => {
  const [isOpen, setIsOpen] = useState(false)

  const selectData = industries.map(el => {
    return el.title
  })

  return (
    <div className={styles.container}>
      <h3 className={styles.header}>Отрасль</h3>
      <Select
        data-elem="industry-select"
        placeholder="Выберите отрасль"
        allowDeselect
        nothingFound="No options"
        maxDropdownHeight={188}
        transitionProps={{ transition: 'scale-y', duration: 200, timingFunction: 'linear' }}
        value={industries.find((el) => el.key === catalogues)?.title}
        onChange={value => updateFilters({ catalogues: value === null ? null : industries.find((el => el.title === value))?.key })}
        data={selectData}
        radius="md"
        size="md"
        onDropdownOpen={() => setIsOpen(true)} // TODO change this bullshit
        onDropdownClose={() => setIsOpen(false)} // TODO change this bullshit
        rightSection={isOpen ? <UpIcon color="#5E96FC" /> : <DownIcon />}
        rightSectionWidth={48}
        styles={SELECT_STYLES}
      />
    </div>
  )
}

export default React.memo(Industry);