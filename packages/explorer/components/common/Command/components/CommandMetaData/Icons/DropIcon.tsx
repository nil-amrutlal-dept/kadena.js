import React, { memo } from 'react';

const DropIcon = () => {
  return (
    <svg
      width="16"
      height="20"
      viewBox="0 0 16 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <path
        d="M8.66 0.58002C8.28 0.25002 7.71 0.25002 7.33 0.58002C2.45 4.88002 0 8.62002 0 11.8C0 16.78 3.8 20 8 20C12.2 20 16 16.78 16 11.8C16 8.62002 13.55 4.88002 8.66 0.58002ZM3.83 12C4.2 12 4.5 12.26 4.57 12.62C4.98 14.84 6.85 15.6 8.21 15.49C8.64 15.47 9 15.81 9 16.24C9 16.64 8.68 16.97 8.28 16.99C6.15 17.12 3.66 15.9 3.09 12.87C3.01 12.42 3.37 12 3.83 12Z"
        fill="#975E9A"
      />
    </svg>
  );
};

export default memo(DropIcon);
