import { Table, TableHeader, TableRow, TableHead, TableCell, TableBody } from '@/shared/components/atomics/table';
import { Skeleton } from '@/shared/components/atomics/skeleton';
import { TEMP_FREE_TRIAL_USERS_TABLE_COLUMN_GROUPS } from '@/views/temp-free-trial/models/const/table';

// 선택 체크박스 너비
const ROW_SELECT_WIDTH = 'w-[4.8rem]';
// 컬럼별 스켈레톤 너비 (row-select 제외)
const COLUMN_SKELETON_WIDTHS = [
  'w-[6rem]', // 학생명
  'w-[10rem]', // 연락가능번호
  'w-[6rem]', // 학년
  'w-[8rem]', // 신청일
  'w-[8rem]', // 유입경로
];

/**
 * TEMP 무료체험 테이블 스켈레톤 컴포넌트
 */
const SkeletonTempFreeTrialTable = () => {
  // 원하는 스켈레톤 행 개수
  const skeletonRows = Array.from({ length: 10 }, (_, i) => i);

  return (
    <>
      <div className="w-full rounded-xl border border-gray-200 bg-white shadow-sm overflow-hidden">
        <Table>
          <TableHeader>
            {/* 그룹 헤더 */}
            <TableRow className="bg-gray-100/80 border-b border-gray-200">
              {TEMP_FREE_TRIAL_USERS_TABLE_COLUMN_GROUPS.map((group) => (
                <TableHead
                  key={group.name}
                  colSpan={group.colSpan}
                  className="text-center py-[1.2rem] font-semibold text-gray-900 border-r last:border-r-0"
                >
                  <Skeleton className="h-[2.4rem] w-[8rem] mx-auto" />
                </TableHead>
              ))}
            </TableRow>

            {/* 컬럼 헤더 */}
            <TableRow className="bg-gray-50/80">
              {/* 선택 체크박스 */}
              <TableHead
                className={`text-center whitespace-nowrap py-[1.2rem] text-[1.4rem] font-medium text-gray-700 border-r ${ROW_SELECT_WIDTH}`}
              >
                <div className="flex justify-center">
                  <Skeleton className="h-[2.4rem] w-[1.6rem]" />
                </div>
              </TableHead>

              {/* 나머지 컬럼 헤더 */}
              {COLUMN_SKELETON_WIDTHS.map((w, idx) => (
                <TableHead
                  key={idx}
                  className="text-center whitespace-nowrap py-[1.2rem] text-[1.4rem] font-medium text-gray-700 border-r last:border-r-0"
                >
                  <div className="flex justify-center">
                    <Skeleton className={`h-[2.4rem] ${w}`} />
                  </div>
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>

          <TableBody>
            {skeletonRows.map((idx) => (
              <TableRow key={idx} className="hover:bg-gray-50/50 transition-colors">
                {/* 선택 체크박스 셀 */}
                <TableCell className={`text-center py-[1.2rem] text-[1.4rem] border-r ${ROW_SELECT_WIDTH}`}>
                  <div className="flex justify-center">
                    <Skeleton className="h-[2.4rem] w-[1.6rem] rounded-sm" />
                  </div>
                </TableCell>

                {/* 데이터 셀 */}
                {COLUMN_SKELETON_WIDTHS.map((w, i) => (
                  <TableCell key={i} className={`text-center py-[1.2rem] text-[1.4rem] border-r ${w}`}>
                    <div className="flex justify-center">
                      <Skeleton className={`h-[2.4rem] ${w} mx-auto`} />
                    </div>
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* 페이지네이션 스켈레톤 */}
      <div className="flex items-center justify-between py-[1.6rem] w-full">
        <Skeleton className="h-[1.6rem] w-[12rem]" />
        <div className="flex items-center gap-[0.8rem]">
          <Skeleton className="h-[3.2rem] w-[5rem] rounded-md" />
          <Skeleton className="h-[1.6rem] w-[6rem]" />
          <Skeleton className="h-[3.2rem] w-[5rem] rounded-md" />
        </div>
      </div>
    </>
  );
};

export default SkeletonTempFreeTrialTable;
