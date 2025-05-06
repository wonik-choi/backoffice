'use client';
import { useState, useCallback } from 'react';

import { Row } from '@tanstack/react-table';

import Message from '@/shared/components/svgs/message/Message';
import PeopleTop from '@/shared/components/svgs/people-top/PeopleTop';
import CirclePlus from '@/shared/components/svgs/circle-plus/CirclePlus';

import { ExpandedRowData } from '@/pages/free-trial/models/interface';
import { ExpandedUserInfoProps } from '@/pages/free-trial/models/interface';

interface ExpandedRowContentNavigationItemProps {
  label: string;
  type: 'basic' | 'counseling' | 'notification';
  active: boolean;
  icon: React.ReactNode;
  changeNavigation: (tab: 'basic' | 'counseling' | 'notification') => void;
}

interface ExpandedRowContentNavigationProps {
  activeTab: 'basic' | 'counseling' | 'notification';
  setActiveTab: (tab: 'basic' | 'counseling' | 'notification') => void;
}

const ExpandedRowContentNavigationItem = ({
  label,
  type,
  active,
  icon,
  changeNavigation,
}: ExpandedRowContentNavigationItemProps) => {
  const handleTabChange = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    changeNavigation(type);
  }, []);

  return (
    <button
      className={`inline-flex items-center gap-2 px-4 py-2 text-sm font-medium ${
        active
          ? 'text-blue-600/90 border-b-2 border-blue-600/90'
          : 'text-gray-500 hover:text-gray-700 hover:border-gray-300 border-b-2 border-transparent'
      }`}
      onClick={handleTabChange}
    >
      {icon}
      {label}
    </button>
  );
};

const ExpandedRowContentNavigation = ({ activeTab, setActiveTab }: ExpandedRowContentNavigationProps) => {
  // setActiveTab 은 setter 이기에 안정적인 참조를 가지고 있어 따로 useCallback 불필요

  const navigationItems: Omit<ExpandedRowContentNavigationItemProps, 'changeNavigation' | 'active'>[] = [
    {
      label: '기본 정보',
      type: 'basic',
      icon: <PeopleTop />,
    },
    {
      label: '상담 기록',
      type: 'counseling',
      icon: <CirclePlus />,
    },
    {
      label: '알림톡 내역',
      type: 'notification',
      icon: <Message />,
    },
  ];

  return (
    <div className="flex justify-between items-center border-b border-gray-200 mb-6">
      <nav className="flex flex-wrap gap-2 -mb-px">
        {navigationItems.map((item) => {
          return (
            <ExpandedRowContentNavigationItem
              key={item.label}
              label={item.label}
              type={item.type}
              active={item.type === activeTab}
              icon={item.icon}
              changeNavigation={setActiveTab}
            />
          );
        })}
      </nav>
    </div>
  );
};

const ExpandedRowContent = <TData extends ExpandedRowData>({
  row,
  counselingRecords,
}: ExpandedUserInfoProps<TData>): React.ReactNode => {
  const [activeTab, setActiveTab] = useState<'basic' | 'counseling' | 'notification'>('basic');

  const userInfo = row.original;
  const userId = userInfo.id.toString();
};

export default ExpandedRowContent;
