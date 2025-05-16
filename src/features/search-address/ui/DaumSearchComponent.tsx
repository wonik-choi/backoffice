'use client';

import DaumPostcode from 'react-daum-postcode';

import type { DaumPostcodeResultDto } from '@/features/search-address/model/dtos';

const theme = {
  textColor: 'oklch(0.708 0 0)',
};

const DaumSearchComponent = ({ complete }: { complete: (data: DaumPostcodeResultDto) => void }) => {
  return <DaumPostcode theme={theme} onComplete={complete} />;
};

export default DaumSearchComponent;
