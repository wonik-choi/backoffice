'use client';
import { usePathname } from 'next/navigation';
import { Home, Inbox } from 'lucide-react';

import { Button } from '@/shared/components/atomics/button';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
} from '@/shared/components/atomics/sidebar';
import NavigationSidebarItem from './NavigationSideberItem';

// widgets
import { useNavigationContext } from '@/widgets/navigation/services/useNavigationContext';

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

  const { postLogout, isPostLogoutPending } = useNavigationContext();

  return (
    <Sidebar className="w-[25rem] p-[1rem] h-dvh">
      <SidebarContent className="bg-white">
        <SidebarGroup className="h-full">
          <SidebarGroupLabel className="font-semibold text-[2rem] pt-[1rem] mb-[3rem]">Backoffice</SidebarGroupLabel>
          <SidebarGroupContent className="h-full">
            <SidebarMenu className="h-full">
              <div className="flex flex-col items-start justify-between h-full">
                <div className="w-full flex-1">
                  {navigationList.map((item) => (
                    <NavigationSidebarItem key={item.label} isActive={pathname === item.href} {...item} />
                  ))}
                </div>

                <Button className="w-full" onClick={() => postLogout()} disabled={isPostLogoutPending}>
                  {isPostLogoutPending ? '로그아웃 중...' : '로그아웃'}
                </Button>
              </div>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
};

export default NavigationSidebar;
