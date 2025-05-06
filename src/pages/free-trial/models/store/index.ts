'use client';

import { create } from 'zustand';
import { FreeTrialState } from '@/pages/free-trial/models/interface';

export const useFreeTrialStore = create<FreeTrialState>((set, get) => ({
  userKeyword: '',
  columnFilters: [],

  setKeyword: (keyword: string) => {
    set({ userKeyword: keyword });
  },

  /**
   * @description 칼럼 필터 토글
   * 주의할 점은, 해당 filter 의 체크 사항은 미리 정의되는 것이 아니라 유동적이라는 부분이다.
   * 처음부터 columnFilters 를 정의하는것이 아니라, 빈 배열로 지정하면서, 유동적으로 추가되는 형태로 구현해야 한다는 점이다. (그것이 react-table)
   * @param columnId 칼럼 아이디,
   * @param value 칼럼 값
   */
  toggleColumnFilter: (columnId: string, value: string) => {
    set((state) => {
      // 우선 해당 columnId 가 필터에 존재하는지 확인한다.
      const targetFilter = state.columnFilters.find((filter) => filter.id === columnId);

      if (!targetFilter) {
        // 존재하지 않는다면 추가합니다.
        // 기존 필터 형식과 햇갈릴 수 있지만, 전체 value 들을 총합하여 필터가 된다고 생각해야 합니다.
        return {
          columnFilters: [...state.columnFilters, { id: columnId, value: value }],
        };
      } else {
        // 존재한다면,
        let modifiedFilters = Array.isArray(targetFilter.value) ? [...targetFilter.value] : [targetFilter.value];

        // 이미 존재한다면 제거하고, 아니라면 추가합니다.
        if (modifiedFilters.includes(value)) {
          modifiedFilters = modifiedFilters.filter((prevValue) => prevValue !== value);
        } else {
          modifiedFilters.push(value);
        }

        // 만일 제거같은 경우로 modifiedFilters 의 길이가 0 가 된다면, 해당 columnId 를 가지는 filter 를 제거합니다.
        if (modifiedFilters.length === 0) {
          return {
            columnFilters: state.columnFilters.filter((filter) => filter.id !== columnId),
          };
        }

        return {
          // 변경된 사항만 반영합니다 (불변성 유지)
          columnFilters: state.columnFilters.map((prevFilter) => {
            return prevFilter.id === columnId ? { ...prevFilter, value: modifiedFilters } : prevFilter;
          }),
        };
      }
    });
  },

  /**
   * @description 컬럼 필터 체크 여부 확인
   * @param columnId 칼럼 아이디
   * @param value 칼럼 값
   */
  checkFilterChecked: (columnId: string, value: string): boolean => {
    const state = get();
    const targetFilter = state.columnFilters.find((filter) => filter.id === columnId);

    if (!targetFilter) return false;

    const modifiedFiltersToArray = Array.isArray(targetFilter.value) ? [...targetFilter.value] : [targetFilter.value];

    return modifiedFiltersToArray.includes(value);
  },

  /**
   * @description 컬럼 필터 초기화
   * @param filters
   */
  resetColumnFilters: () => {
    set({ columnFilters: [] });
  },
}));
