import { KakaoSearchAddressResponseDto } from '@/features/search-address/model/dtos';

export interface SearchAddressQueryStructure {
  searchAddress: (keyword: string) => Promise<KakaoSearchAddressResponseDto>;
}
