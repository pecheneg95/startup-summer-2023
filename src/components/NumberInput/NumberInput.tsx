import React from 'react';

import styles from './NumberInput.module.scss';

const NumberInput = ({
  value,
  onChange,
  placeholder,
  dataElem,
}: {
  value: number;
  onChange: (value: any) => void;
  placeholder: string;
  dataElem: string;
}) => {
  const stepUp = () => {
    const increment = Math.round((value + 1000) / 1000) * 1000;

    onChange(increment);
  };

  const stepDown = () => {
    const decrement = Math.round((value - 1000) / 1000) * 1000;

    onChange(decrement > 0 ? decrement : 0);
  };

  return (
    <div className={styles.container}>
      <input
        data-elem={dataElem}
        className={styles.input}
        type="text"
        value={value || ''}
        onChange={(e) => {
          onChange(Number(e.target.value.replaceAll(/[^0-9]+/g, '')));
        }}
        min={0}
        placeholder={placeholder}></input>
      <div className={styles.rightSection}>
        <div className={styles.control}>
          <svg
            onClick={stepUp}
            width="10"
            height="6"
            viewBox="0 0 10 6"
            fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <path
              onClick={stepUp}
              d="M8.5 4.5L5.39047 1.83469C5.16578 1.6421 4.83422 1.6421 4.60953 1.83469L1.5 4.5"
              stroke="#ACADB9"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
        </div>
        <div className={styles.control}>
          <svg
            onClick={stepDown}
            width="10"
            height="6"
            viewBox="0 0 10 6"
            fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <path
              onClick={stepDown}
              d="M1.5 1.5L4.60953 4.16531C4.83422 4.3579 5.16578 4.3579 5.39047 4.16531L8.5 1.5"
              stroke="#ACADB9"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default React.memo(NumberInput);
