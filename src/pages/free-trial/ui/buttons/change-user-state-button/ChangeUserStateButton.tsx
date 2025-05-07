'use client';

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from '@/shared/components/atomics/dropdown-menu';
import { Button } from '@/shared/components/atomics/button';
import { Row } from '@tanstack/react-table';

import Trash from '@/shared/components/svgs/trash/Trash';
import ArrowRight from '@/shared/components/svgs/arrow-right/ArrowRight';
import XIcon from '@/shared/components/svgs/x-icon/XIcon';
import StaticSpinner from '@/shared/components/svgs/static-spinner/StaticSpinner';
import ChevronDown from '@/shared/components/svgs/chevron-down/ChevronDown';

// 누락된 함수들 선언 (실제 구현은 필요에 따라 추가해야 합니다)
const handleDeleteStudent = (id: string) => {
  console.log('학생 삭제:', id);
  // 삭제 로직 구현
};

const handleStatusChange = (student: any, status: string) => {
  console.log('상태 변경:', student, status);
  // 상태 변경 로직 구현
};

/**
 * @description 추후 로직 들어갈 예정
 * @param {Row<any>} row any 로 되어있는 부분 추후에 타입 지정될 예정
 * @returns
 */
const ChangeUserStateButton = ({ row }: { row: Row<any> }) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="p-[18px] bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100"
        >
          작업
          <ChevronDown className="ml-1" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        <DropdownMenuItem
          className="text-rose-600 hover:text-rose-700 hover:bg-rose-50 cursor-pointer"
          onSelect={(e) => {
            e.preventDefault();
            handleDeleteStudent(String(row.original.id));
          }}
          title="학생의 무료체험 신청을 취소하고 데이터를 삭제합니다."
        >
          <Trash className="mr-2" />
          신청 취소
        </DropdownMenuItem>
        <DropdownMenuItem
          className="text-amber-600 hover:text-amber-700 hover:bg-amber-50 cursor-pointer"
          onSelect={(e) => {
            e.preventDefault();
            handleStatusChange(row.original, '신청보류');
          }}
          title="학생의 무료체험 신청을 보류 상태로 변경합니다."
        >
          <StaticSpinner className="mr-2" />
          신청 보류
        </DropdownMenuItem>
        <DropdownMenuItem
          className="text-red-600 hover:text-red-700 hover:bg-red-50 cursor-pointer"
          onSelect={(e) => {
            e.preventDefault();
            handleStatusChange(row.original, '체험 중단');
          }}
          title="학생의 무료체험을 중단 처리합니다."
        >
          <XIcon className="mr-2" />
          체험 중단
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="text-violet-600 hover:text-violet-700 hover:bg-violet-50 cursor-pointer"
          onSelect={(e) => {
            e.preventDefault();
            handleStatusChange(row.original, '유료 전환');
          }}
          title="학생의 상태를 유료 전환으로 변경합니다."
        >
          <ArrowRight className="mr-2" />
          유료 전환
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ChangeUserStateButton;
