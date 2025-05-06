// src/shared/components/svgs/arrow-right/ArrowRight.tsx
import { HTMLAttributes } from 'react';

interface ArrowRightProps extends HTMLAttributes<SVGElement> {}

const ArrowRight = ({ className, ...props }: ArrowRightProps) => {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M5 12h14"></path>
      <path d="m12 5 7 7-7 7"></path>
    </svg>
  );
};

export default ArrowRight;
