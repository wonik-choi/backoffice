import { Button } from '@/shared/components/atomics/button';
import ClickDownload from '@/shared/components/svgs/click-download/ClickDownload';

import { UseExportCSVProps } from '@/features/export-csv-free-trial-student/models/interface';
import { useExportTableCSV } from '@/features/export-csv-free-trial-student/services/useExportTableCSV';

export const SkeletonExportButton = () => {
  return (
    <Button
      variant="outline"
      className="bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-100 hover:text-blue-800 hover:border-blue-300 font-medium size-fit text-[1.3rem] px-[1rem] py-[0.7rem]"
    >
      <ClickDownload className="mr-[0.5rem] size-[1.4rem]" />
      내보내기
    </Button>
  );
};

function ExportButton<TData>({ table, data, fileName }: UseExportCSVProps<TData>) {
  // 파일을 내보냅니다.
  const exportCSV = useExportTableCSV({ table, data, fileName });

  return (
    <Button
      variant="outline"
      className="bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-100 hover:text-blue-800 hover:border-blue-300 font-medium size-fit text-[1.3rem] px-[1rem] py-[0.7rem]"
      onClick={exportCSV}
    >
      <ClickDownload className="mr-[0.5rem] size-[1.4rem]" />
      내보내기
    </Button>
  );
}

export default ExportButton;
