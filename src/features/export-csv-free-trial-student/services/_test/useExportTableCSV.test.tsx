/**
 * @jest-environment jsdom
 */
import { renderHook, act } from '@testing-library/react';
import innerText from 'react-innertext';
import {
  useExportTableCSV,
  getHeaderNames,
  getRowsData,
} from '@/features/export-csv-free-trial-student/services/useExportTableCSV'; // 경로에 맞게 조정
import type { Table, Header, Row } from '@tanstack/react-table';

jest.mock('react-innertext', () => jest.fn((node) => (typeof node === 'string' ? node : 'JSX')));

describe('useExportCSV & helpers', () => {
  // ———————— 1) 순수 헬퍼 테스트 ————————
  it('getHeaderNames: 문자열/함수형(JSX) 헤더 모두 처리', () => {
    const headers: Header<any, any>[] = [
      {
        id: 'col1',
        column: { columnDef: { header: 'TextHeader' } },
        getContext: () => ({}),
      } as any,
      {
        id: 'col2',
        column: { columnDef: { header: () => <span>SpanHeader</span> } },
        getContext: () => ({}),
      } as any,
    ];

    const names = getHeaderNames(headers);
    expect(names).toEqual(['TextHeader', 'JSX']);
    expect(innerText).toHaveBeenCalled();
  });

  it('getRowsData: visible 셀만 추출해 CSV용 문자열 배열로 반환', () => {
    const rows: Row<any>[] = [
      {
        getAllCells: () => [
          { column: { getIsVisible: () => true }, getValue: () => 'A' },
          { column: { getIsVisible: () => false }, getValue: () => 'X' },
          { column: { getIsVisible: () => true }, getValue: () => 'B' },
        ],
      } as any,
    ];

    const data = getRowsData(rows);
    expect(data).toEqual([['"A"', '"B"']]);
  });

  // —————— 2) 훅 + 브라우저 API 테스트 ——————
  it('useExportCSV: 전체 행 내보내기 및 link 클릭으로 다운로드', () => {
    global.URL = {
      createObjectURL: jest.fn().mockReturnValue('blob:fake'),
      revokeObjectURL: jest.fn(),
    } as unknown as typeof URL;

    // 1) URL.createObjectURL 모킹
    const fakeUrl = 'blob:fake';
    const createObjectURLMock = URL.createObjectURL as jest.Mock;
    createObjectURLMock.mockReturnValue(fakeUrl);

    // 2) document.createElement('a') 모킹 + click 스파이
    const appendSpy = jest.spyOn(document.body, 'appendChild');
    let clicked = false;
    const realCreate = document.createElement.bind(document);
    jest.spyOn(document, 'createElement').mockImplementation((tag) => {
      if (tag === 'a') {
        const a = realCreate('a') as HTMLAnchorElement;
        a.click = () => {
          clicked = true;
        };
        return a;
      }
      return realCreate(tag);
    });

    // 3) 최소 Table 흉내
    const headers = [{ id: 'h1', column: { columnDef: { header: 'H1' } }, getContext: () => ({}) }] as Header<
      any,
      any
    >[];
    const rows = [
      {
        getAllCells: () => [{ column: { getIsVisible: () => true }, getValue: () => 'cell1' }],
      },
    ] as Row<any>[];
    const table = {
      getHeaderGroups: () => [{ headers }],
      getSelectedRowModel: () => ({ rows: [] }),
      getRowModel: () => ({ rows }),
    } as unknown as Table<any>;

    const data = [{ foo: 'bar' }];

    const { result } = renderHook(() => useExportTableCSV({ table, data, fileName: 'myfile' }));

    act(() => {
      result.current(); // export 실행
    });

    // 4) Assertions
    expect(URL.createObjectURL).toHaveBeenCalled();
    expect(appendSpy).toHaveBeenCalled();
    expect(clicked).toBe(true);

    // cleanup mocks
    appendSpy.mockRestore();
    createObjectURLMock.mockClear();
  });
});
