import React from 'react';

const ChevronRightIcon = ({ color }: { color: string }) => {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <path
        d="M8.63301 7.99999L5.33301 4.69999L6.27601 3.75699L10.519 7.99999L6.27601 12.243L5.33301 11.3L8.63301 7.99999Z"
        fill={color}
      />
    </svg>
  );
};

export default React.memo(ChevronRightIcon);