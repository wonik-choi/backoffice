import React from 'react';
import { cva } from 'class-variance-authority';
import Link from 'next/link';
import { cn } from '@/shared/lib/utils';

import { SidebarMenuItem, SidebarMenuButton } from '@/shared/components/atomics/sidebar';
import { Label } from '@/shared/components/atomics/label';
import { LucideIcon } from 'lucide-react';

interface NavigationListItemProps {
  label: string;
  href: string;
  icon: LucideIcon;
  isActive: boolean;
}

const navigationItemVariants = cva(
  'py-1 text-base font-semibold text-gray-500 hover:text-violet-700 transition-colors border-b-[0.15rem] border-transparent hover:border-violet-400',
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

const NavigationSidebarItem = ({ label, href, isActive, icon }: NavigationListItemProps) => {
  return (
    <SidebarMenuItem className={cn(navigationItemVariants({ isActive }))}>
      <SidebarMenuButton asChild>
        <Link href={href}>
          {React.createElement(icon)}
          <Label>{label}</Label>
        </Link>
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
};

export default NavigationSidebarItem;
