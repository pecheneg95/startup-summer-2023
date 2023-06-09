import React from 'react';

const ChevronLeftIcon = ({ color }: { color: string }) => {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <path
        d="M7.36699 7.99999L10.667 4.69999L9.72399 3.75699L5.48099 7.99999L9.72399 12.243L10.667 11.3L7.36699 7.99999Z"
        fill={color}
      />
    </svg>
  );
};

export default React.memo(ChevronLeftIcon);
