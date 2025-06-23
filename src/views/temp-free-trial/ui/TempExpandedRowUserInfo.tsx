import { Row } from '@tanstack/react-table';

import PeopleTop from '@/shared/components/svgs/people-top/PeopleTop';
import ClockCircle from '@/shared/components/svgs/clock-circle/ClockCircle';
import Pad from '@/shared/components/svgs/pad/Pad';

import { ExpandedFreeTrialUsersTableRowData } from '@/views/temp-free-trial/models/interface';
import { tempExpandedRowInformationConverter } from '@/views/temp-free-trial/models/converter/tempExpandedRowInformationConverter';

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
const TempExpandedRowUserInfo = <TData extends ExpandedFreeTrialUsersTableRowData>({
  row,
}: ExpandedRowUserInfoProps<TData>) => {
  const userInfo = row.original;

  // 전달받은 데이터를 변경해줍니다.
  const rowInformation = tempExpandedRowInformationConverter(userInfo);

  const basicInfo: UserInfoCardProps = {
    title: '기본 정보',
    lists: [
      {
        id: '0',
        label: '이름',
        value: rowInformation.user.name || '-',
      },
      {
        id: '1',
        label: '전화번호',
        value: rowInformation.user.phone || '-',
      },
      {
        id: '2',
        label: '등록일',
        value: rowInformation.user.createdAt || '-',
      },
      {
        id: '3',
        label: '체험 기간',
        value: `${rowInformation.user.trialDays}일` || '-',
      },
      {
        id: '4',
        label: '유입 경로',
        value: rowInformation.user.inflow || '-',
      },
    ],
    titleIcon: <PeopleTop className="text-blue-500" />,
  };

  const referrerInfo: UserInfoCardProps = {
    title: '추천인 정보',
    lists: [
      {
        id: '0',
        label: '이름',
        value: rowInformation.referrer.name || '-',
      },
      {
        id: '1',
        label: '전화번호',
        value: rowInformation.referrer.phone || '-',
      },
      {
        id: '2',
        label: '회사',
        value: rowInformation.referrer.company || '-',
      },
    ],
    titleIcon: <ClockCircle className="text-emerald-500" />,
  };

  return (
    <section className="grid grid-cols-2 gap-[2.4rem]">
      <UserInfoCard {...basicInfo} />
      <UserInfoCard {...referrerInfo} />
    </section>
  );
};

export default TempExpandedRowUserInfo;
