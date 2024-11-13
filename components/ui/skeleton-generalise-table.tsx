import React from 'react';
import { Skeleton } from './skeleton';
import { TableRow, TableCell } from './table';

export default function SkeletonGeneralise({ rows, cols }: { rows: number; cols: number }) {
  return (
    <>
      {Array.from({ length: rows }).map((_, rowIndex) => (
        <TableRow key={rowIndex}>
          {Array.from({ length: cols }).map((_, colIndex) => (
            <TableCell key={colIndex}>
              <Skeleton className="h-6" />
            </TableCell>
          ))}
        </TableRow>
      ))}
    </>
  );
}
