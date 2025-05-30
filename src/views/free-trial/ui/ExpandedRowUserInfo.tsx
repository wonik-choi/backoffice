import { Row } from '@tanstack/react-table';

import PeopleTop from '@/shared/components/svgs/people-top/PeopleTop';
import ClockCircle from '@/shared/components/svgs/clock-circle/ClockCircle';
import Pad from '@/shared/components/svgs/pad/Pad';

import { ExpandedRowData } from '@/views/free-trial/models/interface';

interface UserInfoCardProps {
  title: string;
  lists: {
    id: string;
    label: string;
    value: string;
  }[];
  titleIcon: React.ReactNode;
}

const UserInfoCard = ({ title, lists, titleIcon }: UserInfoCardProps) => {
  return (
    <div className="bg-white rounded-lg p-[2rem] shadow-sm border border-gray-100">
      <h3 className="font-medium text-gray-900 flex items-center gap-[0.8rem] mb-[1.6rem]">
        {titleIcon}
        {title}
      </h3>
      <dl className="space-y-[1.2rem]">
        {lists.map((list) => {
          return (
            <div key={list.id} className="flex items-center">
              <dt className="w-[9.6rem] flex-shrink-0 text-[1.4rem] text-gray-500">{list.label}</dt>
              <dd className="text-[1.4rem] font-medium text-gray-900">{list.value}</dd>
            </div>
          );
        })}
      </dl>
    </div>
  );
};

interface ExpandedRowUserInfoProps<TData> {
  row: Row<TData>;
}

// TODO: 지금은 ExpandedRowData 를 extends 하지만 상황에 따라 어떤식으로 제네릭을 사용할지 정책을 고민해볼 필요가 있음
const ExpandedRowUserInfo = <TData extends ExpandedRowData>({ row }: ExpandedRowUserInfoProps<TData>) => {
  const userInfo = row.original;

  const basicInfo: UserInfoCardProps = {
    title: '기본 정보',
    lists: [
      {
        id: '0',
        label: '이름',
        value: userInfo.name || '-',
      },
      {
        id: '1',
        label: '전화번호',
        value: userInfo.phone || '-',
      },
      {
        id: '2',
        label: '등록일',
        value: '-',
      },
      {
        id: '3',
        label: '입학경로',
        value: userInfo.enterancePath || '-',
      },
    ],
    titleIcon: <PeopleTop className="text-blue-500" />,
  };

  const checkPeriodInfo: UserInfoCardProps = {
    title: '체험 기간',
    lists: [
      {
        id: '0',
        label: '시작일',
        value: userInfo.checkPeriod?.startDate?.toLocaleDateString() || '-',
      },
      {
        id: '1',
        label: '종료일',
        value: userInfo.checkPeriod?.endDate?.toLocaleDateString() || '-',
      },
      {
        id: '2',
        label: '진행일수',
        value: userInfo.checkPeriod?.duration || '-',
      },
      {
        id: '3',
        label: '상태',
        value: userInfo.checkPeriod?.status || '-',
      },
    ],
    titleIcon: <ClockCircle className="text-emerald-500" />,
  };

  const deviceRentalInfo: UserInfoCardProps = {
    title: '아이패드 대여',
    lists: [
      {
        id: '0',
        label: '수령지',
        value: userInfo.upgrade?.deviceRentalAddress || '-',
      },
      {
        id: '1',
        label: '대여일자',
        value: userInfo.upgrade?.rentalDate?.toLocaleDateString() || '-',
      },
      {
        id: '2',
        label: '반납일',
        value: userInfo.upgrade?.returnDate?.toLocaleDateString() || '-',
      },
    ],
    titleIcon: <Pad className="text-violet-500" />,
  };

  return (
    <section className="grid grid-cols-3 gap-[2.4rem]">
      <UserInfoCard {...basicInfo} />
      <UserInfoCard {...checkPeriodInfo} />
      <UserInfoCard {...deviceRentalInfo} />
    </section>
  );
};

export default ExpandedRowUserInfo;
