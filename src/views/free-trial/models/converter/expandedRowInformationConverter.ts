// views
import { ExpandedFreeTrialUsersTableRowData, ExpandedRowInformation } from '@/views/free-trial/models/interface';

export const expandedRowInformationConverter = (row: ExpandedFreeTrialUsersTableRowData): ExpandedRowInformation => {
  const rowData: ExpandedRowInformation = {
    user: {
      name: row.name,
      phone: row.phone,
      registrationDate: row.registrationDate,
    },
    period: {
      startDate: row.period.startDate,
      endDate: row.period.endDate,
      duration: row.period.duration,
      status: row.period.status ?? '미확정',
    },
    rental: {
      address: '',
      detailAddress: '',
      startDate: '',
      returnDate: '',
    },
  };

  if (row.freeTrialUserDto.rental) {
    const dtoRentalInformation = {
      address: `(${row.freeTrialUserDto.rental.zonecode}) ${row.freeTrialUserDto.rental.address}`,
      detailAddress: row.freeTrialUserDto.rental.detailAddress,
      startDate: row.freeTrialUserDto.rental.rentalStartDate ?? '-',
      returnDate: row.freeTrialUserDto.rental.rentalReturnDate ?? '-',
    };

    rowData.rental = dtoRentalInformation;
  }

  return rowData;
};
