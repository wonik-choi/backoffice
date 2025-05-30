'use client';
import { useState, useCallback } from 'react';

import Message from '@/shared/components/svgs/message/Message';
import PeopleTop from '@/shared/components/svgs/people-top/PeopleTop';
import CirclePlus from '@/shared/components/svgs/circle-plus/CirclePlus';
import { UserRoundCheck } from 'lucide-react';

// features
import EditFreeTrialStudentDialog from '@/features/edit-free-trial-student/ui/EditFreeTrialStudentDialog';

// pages
import ChangeUserStateButton from '@/views/free-trial/ui/buttons/change-user-state-button/ChangeUserStateButton';
import ExpandedRowUserInfo from '@/views/free-trial/ui/ExpandedRowUserInfo';
import ExpandedRowCounselingRecord from '@/views/free-trial/ui/ExpandedRowCounselingRecord';
import ExpandedRowMessageRecord from '@/views/free-trial/ui/ExpandedRowMessageRecord';

import { ExpandedRowData } from '@/views/free-trial/models/interface';
import { ExpandedUserInfoProps } from '@/views/free-trial/models/interface';

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

const ExpandedRowContent = <TData extends ExpandedRowData>({
  row,
  counselingRecords,
}: ExpandedUserInfoProps<TData>): React.ReactNode => {
  const [activeTab, setActiveTab] = useState<'basic' | 'counseling' | 'notification'>('basic');

  const userInfo = row.original;
  const userId = userInfo.id.toString();

  // TODO: 추후 정책이 정해지면 변경 예정
  const exampleStudent = {
    name: userInfo.name,
    phone: userInfo.phone,
    registrationDate: userInfo.registrationDate,
    enterancePath: userInfo.enterancePath,
    testPeriod: {
      startDate: userInfo.checkPeriod?.startDate,
      endDate: userInfo.checkPeriod?.endDate,
    },
    deviceRental: {
      deviceRentalAddress: userInfo.upgrade?.deviceRentalAddress,
      rentalDate: userInfo.upgrade?.rentalDate,
      returnDate: userInfo.upgrade?.returnDate,
    },
  };

  return (
    <div className="p-[1.6rem] bg-gray-50">
      <div className="flex justify-between items-center pb-[0.8rem] border-b border-gray-200 mb-[2.4rem]">
        <ExpandedRowContentNavigation activeTab={activeTab} setActiveTab={setActiveTab} />
        <div className="flex items-center gap-[0.8rem]">
          <EditFreeTrialStudentDialog student={exampleStudent} />
          <ChangeUserStateButton row={row} />
        </div>
      </div>
      {activeTab === 'basic' && <ExpandedRowUserInfo row={row} />}
      {activeTab === 'counseling' && <ExpandedRowCounselingRecord />}
      {activeTab === 'notification' && <ExpandedRowMessageRecord />}
    </div>
  );
};

export default ExpandedRowContent;
