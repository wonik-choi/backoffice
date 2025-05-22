'use client';

import React from 'react';
import { Header, Row } from '@tanstack/react-table';
import innerText from 'react-innertext';

import { UseExportCSVProps } from '@/features/export-csv-free-trial-student/models/interface';
import { BOM } from '@/features/export-csv-free-trial-student/models/const';

export const getHeaderNames = <TData>(headers: Header<TData, any>[]): string[] => {
  return headers.map((header) => {
    const h = header.column.columnDef.header;
    // 함수라면
    if (typeof h === 'function') {
      // 헤더 컨텍스트를 전달하여 결과를 받고
      const rendered = h(header.getContext());
      // 문자열이면 그대로 아니면 문자열로 변환
      if (typeof rendered === 'string') {
        return rendered;
      }
      return innerText(rendered); // 정확하게 텍스트화 시키기 위한 라이브러리
    }
    // h 가 함수가 아니라면 (아마도 문자열) 반환. 없다면 id 반환
    return h ?? header.id;
  });
};

export const getRowsData = <TData>(rows: Row<TData>[]): string[][] => {
  return rows.map((row) => {
    return row
      .getAllCells()
      .filter((cell) => cell.column.getIsVisible()) // 보이는 컬럼만 추려낸다.
      .map((cell) => {
        const raw = cell.getValue();
        const text = typeof raw === 'string' ? raw : String(raw ?? '');
        return `"${text.replace(/"/g, '""')}"`;
      });
  });
};

export const useExportTableCSV = <TData>({ table, data, fileName }: UseExportCSVProps<TData>) => {
  return React.useCallback(() => {
    const headers = table.getHeaderGroups()[0]?.headers ?? [];
    const headerNames = getHeaderNames(headers)
      .map((h) => `${h.replace(/"/g, '""')}`)
      .join(',');

    const selected = table.getSelectedRowModel().rows;
    const sourceRows = selected.length > 0 ? selected : data.map((d) => ({ original: d } as Row<TData>));
    const rowsData = getRowsData(
      'getAllCells' in sourceRows[0] ? (sourceRows as Row<TData>[]) : table.getRowModel().rows
    );

    const csvLines = [headerNames, ...rowsData.map((r) => r.join(','))];
    const blob = new Blob([BOM + csvLines.join('\n')], { type: 'text/csv;charset=utf-8;' });

    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    const date = new Date().toISOString().split(`T`)[0];
    link.download = `${fileName ?? 'export'}_${date}.csv`;
    document.body.appendChild(link);
    link.click();
    // 메모리 해제
    URL.revokeObjectURL(link.href);
    document.body.removeChild(link);
  }, [table, data, fileName]);
};
