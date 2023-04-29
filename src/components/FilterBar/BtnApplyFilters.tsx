import React from 'react';
import { Button } from '@mantine/core';

import styles from "./BtnApplyFilters.module.scss"

const BTN__STYLES = {
  root: {
    width: "100%",
    height: "40px",
    marginTop: "20px",
    border: "none",
    fontFamily: 'Inter',
    fontStyle: "normal" as const,
    fontWeight: "bold" as const,
    fontSize: "14px",
    lineHeight: "21px",
    textAlign: "center" as const,
    background: "#5E96FC",
    color: "#FFFFFF",
    transition: ".2s",
    '&:hover': {
      background: "#92C1FF",
    },
    '&:active': {
      background: "#3B7CD3",
    }
  }
}

function BtnApplyFilters({ doRequest }: { doRequest: () => void }) {
  return (
    <Button
      className={styles.btn}
      data-elem="search-button"
      radius="md"
      size="md"
      onClick={doRequest}
      styles={BTN__STYLES}>
      Применить
    </Button>
  );
}

export default React.memo(BtnApplyFilters)