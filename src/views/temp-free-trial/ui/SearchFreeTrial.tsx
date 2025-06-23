'use client';

// ui
import Search from '@/shared/components/svgs/search/Search';
import { Input } from '@/shared/components/atomics/input';

// model
import { useTempFreeTrialStore } from '@/views/temp-free-trial/models/store';

const SearchFreeTrial = () => {
  const { userKeyword, setKeyword } = useTempFreeTrialStore();

  return (
    <div className="relative flex-1 min-w-[25rem]">
      <div className="absolute inset-y-0 left-0 top-[0.2rem] pl-[1rem] flex items-center pointer-events-none">
        <Search />
      </div>
      <Input
        placeholder="이름, 연락처로 검색..."
        value={userKeyword ?? ''}
        onChange={(event) => setKeyword(event.target.value)}
        className="py-[1.5rem] px-[2.5rem] w-full text-[1.2rem] bg-white border-gray-200 focus:border-violet-500 focus:ring-violet-500"
      />
    </div>
  );
};

export default SearchFreeTrial;
