import { cva } from 'class-variance-authority';
import Link from 'next/link';
import { cn } from '@/shared/lib/utils';

interface NavigationListItemProps {
  label: string;
  href: string;
  isActive: boolean;
}

const navigationItemVariants = cva(
  'pb-3 text-base font-semibold text-gray-500 hover:text-violet-700 transition-colors border-b-2 border-transparent hover:border-violet-400',
  {
    variants: {
      isActive: {
        true: 'text-violet-700 border-violet-600',
        false: 'text-gray-500 border-transparent',
      },
    },
    defaultVariants: {
      isActive: false,
    },
  }
);

const NavigationListItem = ({ label, href, isActive }: NavigationListItemProps) => {
  return (
    <Link href={href} className={cn(navigationItemVariants({ isActive }))}>
      {label}
    </Link>
  );
};

export default NavigationListItem;
