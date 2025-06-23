'use client';
import { useState, useCallback } from 'react';

import Message from '@/shared/components/svgs/message/Message';
import PeopleTop from '@/shared/components/svgs/people-top/PeopleTop';
import { UserRoundCheck } from 'lucide-react';

// features
import { DeleteTempFreeTrialUserButton } from '@/features/temp-free-trial-user/ui/DeleteTempFreeTrialUserButton';

// pages
import ChangeUserStateButton from '@/views/temp-free-trial/ui/buttons/change-user-state-button/ChangeUserStateButton';
import ExpandedRowUserInfo from '@/views/temp-free-trial/ui/TempExpandedRowUserInfo';
import ExpandedRowCounselingRecord from '@/views/temp-free-trial/ui/ExpandedRowCounselingRecord';
import ExpandedRowMessageRecord from '@/views/temp-free-trial/ui/ExpandedRowMessageRecord';

import { ExpandedFreeTrialUsersTableRowData } from '@/views/temp-free-trial/models/interface';
import { ExpandedUserInfoProps } from '@/views/temp-free-trial/models/interface';

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
      className={`inline-flex items-center gap-[0.8rem] px-[1.6rem] py-[0.8rem] text-[1.4rem] font-medium [&>svg]:size-[1.5rem] ${
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
      icon: <UserRoundCheck />,
    },
    {
      label: '알림톡 내역',
      type: 'notification',
      icon: <Message />,
    },
  ];

  return (
    <nav className="flex flex-wrap gap-[0.8rem] mb-px">
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
  );
};

const TempExpandedRowContent = <TData extends ExpandedFreeTrialUsersTableRowData>({
  row,
  counselingRecords,
}: ExpandedUserInfoProps<TData>): React.ReactNode => {
  const [activeTab, setActiveTab] = useState<'basic' | 'counseling' | 'notification'>('basic');

  const userInfo = row.original;
  const userId = userInfo.id.toString();

  return (
    <div className="p-[1.6rem] bg-gray-50">
      <div className="flex justify-between items-center pb-[0.8rem] border-b border-gray-200 mb-[2.4rem]">
        <ExpandedRowContentNavigation activeTab={activeTab} setActiveTab={setActiveTab} />
        <div className="flex items-center gap-[0.8rem]">
          <DeleteTempFreeTrialUserButton freeTrialUserId={userId} />
          <ChangeUserStateButton row={row} />
        </div>
      </div>
      {activeTab === 'basic' && <ExpandedRowUserInfo row={row} />}
      {activeTab === 'counseling' && <ExpandedRowCounselingRecord />}
      {activeTab === 'notification' && <ExpandedRowMessageRecord />}
    </div>
  );
};

export default TempExpandedRowContent;
