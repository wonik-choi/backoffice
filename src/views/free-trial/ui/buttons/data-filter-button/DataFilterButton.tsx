'use client';
import { Filter } from 'lucide-react';

// pages
import { useFreeTrialStore } from '@/views/free-trial/models/store';
import { USER_STATUS, USER_DEVICE_RENTAL_STATUS } from '@/views/free-trial/models/const/freeTrialUserStatus';

// shared
import { Button } from '@/shared/components/atomics/button';
import { Checkbox } from '@/shared/components/atomics/checkbox';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/shared/components/atomics/dropdown-menu';
import { deviceRentalOptions, statusOptions } from '@/views/free-trial/models/const/freeTrialUserStatus';

function DataFilterButton() {
  const { columnFilters, toggleColumnFilter, checkFilterChecked } = useFreeTrialStore();

  // 필터 카운트
  const filterCount = columnFilters.reduce((acc, f) => acc + (Array.isArray(f.value) ? f.value.length : 1), 0);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className="bg-violet-50 text-violet-700 border-violet-200 hover:bg-violet-100 hover:text-violet-800 hover:border-violet-300 font-medium"
        >
          <Filter className="mr-2 h-4 w-4" />
          필터
          {filterCount > 0 && (
            <span className="ml-2 flex h-5 w-5 items-center justify-center rounded-full bg-violet-200 text-xs font-semibold text-violet-800">
              {filterCount}
            </span>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <div className="px-2 py-1.5">
          <p className="text-sm font-semibold text-gray-900 mb-2">처리상태</p>
          <div className="space-y-1">
            {statusOptions.map((status) => (
              <div key={status} className="flex items-center">
                <Checkbox
                  checked={checkFilterChecked(USER_STATUS, status)}
                  onCheckedChange={() => toggleColumnFilter(USER_STATUS, status)}
                  className="data-[state=checked]:bg-violet-600 data-[state=checked]:border-violet-600"
                />
                <label className="ml-2 text-sm text-gray-600">{status}</label>
              </div>
            ))}
          </div>
        </div>
        <DropdownMenuSeparator />
        <div className="px-2 py-1.5">
          <p className="text-sm font-semibold text-gray-900 mb-2">대여여부</p>
          <div className="space-y-1">
            {deviceRentalOptions.map((status) => (
              <div key={status} className="flex items-center">
                <Checkbox
                  checked={checkFilterChecked(USER_DEVICE_RENTAL_STATUS, status)}
                  onCheckedChange={() => toggleColumnFilter(USER_DEVICE_RENTAL_STATUS, status)}
                  className="data-[state=checked]:bg-violet-600 data-[state=checked]:border-violet-600"
                />
                <label className="ml-2 text-sm text-gray-600">{status}</label>
              </div>
            ))}
          </div>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default DataFilterButton;
