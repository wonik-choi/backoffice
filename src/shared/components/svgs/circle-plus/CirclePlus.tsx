import { HTMLAttributes } from 'react';

interface CirclePlusProps extends HTMLAttributes<SVGElement> {}

const CirclePlus = ({ className, ...props }: CirclePlusProps) => {
  return (
    <svg
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <circle cx="12" cy="12" r="10" />
      <path d="M12 8v8M8 12h8" />
    </svg>
  );
};

export default CirclePlus;
