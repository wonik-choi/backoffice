import { HTMLAttributes } from 'react';

interface ShoutingStarProps extends HTMLAttributes<SVGElement> {}

const ShoutingStar = ({ className, ...props }: ShoutingStarProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      className={className}
      {...props}
    >
      <path
        d="M8.00007 5.66683L9.41074 9.0585L13.0723 9.3521L10.2826 11.7418L11.1349 15.3149L8.00007 13.4002L4.86518 15.3149L5.7175 11.7418L2.92773 9.3521L6.58935 9.0585L8.00007 5.66683ZM5.33337 1.3335V7.3335H4.00003V1.3335H5.33337ZM12.0001 1.3335V7.3335H10.6667V1.3335H12.0001ZM8.66673 1.3335V4.66683H7.3334V1.3335H8.66673Z"
        fill="currentColor"
      />
    </svg>
  );
};

export default ShoutingStar;
