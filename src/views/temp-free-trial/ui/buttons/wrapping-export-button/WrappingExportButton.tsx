'use client';

// features
import ExportButton from '@/features/export-csv-free-trial-student/ui/ExportButton';

// views
import type { TempFreeTrialTableUsecaseProps } from '@/views/temp-free-trial/models/converter/interface';
import { ExpandedFreeTrialUsersTableRowData } from '@/views/temp-free-trial/models/interface';
import { useInitialTempFreeTrialTable } from '@/views/temp-free-trial/services/usecase/useInitialTempFreeTrialTable';
import { useGetTempFreeTrialUsersBody } from '@/views/temp-free-trial/services/query/useGetTempFreeTrialUsersBody';
import { TEMP_FREE_TRIAL_USERS_TABLE_COLUMNS } from '@/views/temp-free-trial/models/const/table';

interface WrappingExportButtonProps
  extends TempFreeTrialTableUsecaseProps<ExpandedFreeTrialUsersTableRowData, unknown> {
  fileName: string;
}

const WrappingExportButton = ({ fileName }: Pick<WrappingExportButtonProps, 'fileName'>) => {
  const { tableData } = useGetTempFreeTrialUsersBody();
  const { table } = useInitialTempFreeTrialTable({ columns: TEMP_FREE_TRIAL_USERS_TABLE_COLUMNS, tableData });

  return <ExportButton table={table} fileName={fileName} data={tableData} />;
};

export default WrappingExportButton;
