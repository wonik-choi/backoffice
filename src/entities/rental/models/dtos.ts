import { AddressType, DeviceType } from '@/entities/rental/models/enums';

export interface RentalDto {
  id: number;
  zonecode: string;
  address: string;
  addressType: AddressType;
  detailAddress: string;
  rentalStartDate: string;
  rentalEndDate: string;
  rentalReturnDate: string;
  deviceType: DeviceType;
  deviceModel: string;
  deviceNumber: string;
  createdAt: string;
}
