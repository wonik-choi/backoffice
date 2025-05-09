'use client';

// ui
import Search from '@/shared/components/svgs/search/Search';
import { Input } from '@/shared/components/atomics/input';

// model
import { useFreeTrialStore } from '@/views/free-trial/models/store';

const SearchFreeTrial = () => {
  const { userKeyword, setKeyword } = useFreeTrialStore();

  return (
    <div className="relative flex-1 max-w-sm">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <Search />
      </div>
      <Input
        placeholder="이름, 연락처로 검색..."
        value={userKeyword ?? ''}
        onChange={(event) => setKeyword(event.target.value)}
        className="pl-10 pr-4 w-full bg-white border-gray-200 focus:border-violet-500 focus:ring-violet-500"
      />
    </div>
  );
};

export default SearchFreeTrial;
