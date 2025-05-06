import { HTMLAttributes } from 'react';

interface Pad extends HTMLAttributes<SVGElement> {}

const Pad = ({ className, ...props }: Pad) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      {...props}
    >
      <rect width="16" height="20" x="4" y="2" rx="2" />
      <path d="M9 22v-4h6v4" />
      <path d="M8 6h8" />
      <path d="M8 10h8" />
    </svg>
  );
};

export default Pad;
