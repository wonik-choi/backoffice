'use client';
import { usePathname } from 'next/navigation';
import { Home, Inbox } from 'lucide-react';

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
} from '@/shared/components/atomics/sidebar';
import NavigationSidebarItem from './NavigationSideberItem';

// Menu items.

const navigationList = [
  {
    label: '대시보드',
    href: '/home',
    icon: Home,
  },
  {
    label: '무료체험 고객관리',
    href: '/free-trial',
    icon: Inbox,
  },
];

const NavigationSidebar = () => {
  const pathname = usePathname();
  return (
    <Sidebar className="w-[25rem] p-[1rem]">
      <SidebarContent className="bg-white">
        <SidebarGroup>
          <SidebarGroupLabel className="font-semibold text-[2rem] pt-[1rem] mb-[3rem]">Backoffice</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navigationList.map((item) => (
                <NavigationSidebarItem key={item.label} isActive={pathname === item.href} {...item} />
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
};

export default NavigationSidebar;
