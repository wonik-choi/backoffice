'use client';

import type { FreeTrialTableUsecaseProps } from '@/views/free-trial/models/converter/interface';
import { ExpandedFreeTrialUsersTableRowData } from '@/views/free-trial/models/interface';
import { useInitialFreeTrialTable } from '@/views/free-trial/services/usecase/useInitialFreeTrialTable';

// features
import ExportButton from '@/features/export-csv-free-trial-student/ui/ExportButton';

// views
import { useGetFreeTrialUsersBody } from '@/views/free-trial/services/query/useGetFreeTrialUsersBody';
import { FREE_TRIAL_USERS_TABLE_COLUMNS } from '@/views/free-trial/models/const/table';

interface WrappingExportButtonProps extends FreeTrialTableUsecaseProps<ExpandedFreeTrialUsersTableRowData, unknown> {
  fileName: string;
}

const WrappingExportButton = ({ fileName }: Pick<WrappingExportButtonProps, 'fileName'>) => {
  const { tableData } = useGetFreeTrialUsersBody();
  const { table } = useInitialFreeTrialTable({ columns: FREE_TRIAL_USERS_TABLE_COLUMNS, tableData });

  return <ExportButton table={table} fileName={fileName} data={tableData} />;
};

export default WrappingExportButton;
