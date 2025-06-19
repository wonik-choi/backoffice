import { Table, TableHeader, TableRow, TableHead, TableCell, TableBody } from '@/shared/components/atomics/table';
import { Skeleton } from '@/shared/components/atomics/skeleton';
import { FREE_TRIAL_USERS_TABLE_COLUMN_GROUPS } from '@/views/free-trial/models/const/table';

/**
 * 페이지 네비게이션과 본문에 표시할 스켈레톤 컬럼 정의
 */
const ROW_SELECT_WIDTH = 'w-[4.8rem]';
// 헤더 및 바디 컬럼 너비 정의 (학생명, 번호, 처리상태...) 순서대로
const COLUMN_SKELETON_WIDTHS = [
  'w-[6rem]', // 학생명
  'w-[10rem]', // 연락가능번호
  'w-[6rem]', // 처리상태
  'w-[8rem]', // 유입경로
  'w-[8rem]', // 시작일
  'w-[8rem]', // 종료일
  'w-[6rem]', // 진행상태
  'w-[5rem]', // 체험기간
];

/**
 * TableSkeleton 컴포넌트
 */
const SkeletonFreeTrialTable = () => {
  const skeletonRows = Array.from({ length: 10 }, (_, i) => i);

  return (
    <>
      <div className="w-full rounded-xl border border-gray-200 bg-white shadow-sm overflow-hidden">
        <Table>
          <TableHeader>
            {/* 그룹 헤더 */}
            <TableRow className="bg-gray-100/80 border-b border-gray-200">
              <TableHead className="text-center py-[1.2rem] font-semibold text-gray-900 border-r">
                <Skeleton className="h-[2.4rem] w-[3rem] mx-auto" />
              </TableHead>
              {FREE_TRIAL_USERS_TABLE_COLUMN_GROUPS.map((group) => (
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
              <TableHead className="text-center whitespace-nowrap py-[1.2rem] text-[1.4rem] font-medium text-gray-700 border-r">
                <div className="flex justify-center">
                  <Skeleton className="h-[2.4rem] w-[1.6rem]" />
                </div>
              </TableHead>

              {/* 나머지 컬럼 */}
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

                {/* 데이터 셀들 */}
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

export default SkeletonFreeTrialTable;
