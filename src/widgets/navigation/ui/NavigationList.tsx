'use client';
import { usePathname } from 'next/navigation';

import NavigationListItem from './NavigationListItem';

const NavigationList = () => {
  const pathname = usePathname();

  const navigationList = [
    {
      label: '대시보드',
      href: '/home',
    },
    {
      label: '무료체험 고객관리',
      href: '/free-trial',
    },
  ];

  return (
    <nav className="flex items-center gap-5 mb-8 border-b border-gray-200">
      {navigationList.map((navigation) => {
        return (
          <NavigationListItem
            key={navigation.label}
            href={navigation.href}
            label={navigation.label}
            isActive={navigation.href === pathname}
          />
        );
      })}
    </nav>
  );
};

export default NavigationList;
