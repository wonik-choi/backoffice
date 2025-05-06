import { HTMLAttributes } from 'react';

interface ThreeLineTriangleProps extends HTMLAttributes<SVGElement> {}

const ThreeLineTriangle = ({ className, ...props }: ThreeLineTriangleProps) => {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M3 7h18M6 12h12M10 17h4" />
    </svg>
  );
};

export default ThreeLineTriangle;
