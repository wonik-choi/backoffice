// entities
import { inflowBehavior } from '@/entities/inflow/models/behaviors/InflowBehavior';

// views
import { ExpandedFreeTrialUsersTableRowData, ExpandedRowInformation } from '@/views/temp-free-trial/models/interface';

export const tempExpandedRowInformationConverter = (
  row: ExpandedFreeTrialUsersTableRowData
): ExpandedRowInformation => {
  const rowData: ExpandedRowInformation = {
    user: {
      name: row.name,
      phone: row.phone,
      createdAt: row.createdAt,
      inflow: row.inflow,
      trialDays: row.tempFreeTrialUserDto.inflow.detail.trialDays,
    },
    referrer: {
      name: '',
      phone: '',
      company: '',
    },
  };

  const inflowDetail = row.tempFreeTrialUserDto.inflow.detail;

  if (inflowBehavior.checkReferrerIsExist(inflowDetail)) {
    rowData.referrer.name = inflowDetail.referrer.name;
    rowData.referrer.phone = inflowDetail.referrer.phoneNumber;
    rowData.referrer.company = inflowDetail.referrer.companyName;
  }

  return rowData;
};
