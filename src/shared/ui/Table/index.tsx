import { type HTMLAttributes, forwardRef } from 'react';
import { cn } from '@/shared/utils/cn';

const Table = forwardRef<HTMLTableElement, HTMLAttributes<HTMLTableElement>>(
  ({ className, children, ...props }, ref) => (
    <div className="w-full overflow-x-auto rounded-2xl border border-[rgba(255,255,255,0.06)] bg-[rgba(15,23,42,0.5)] backdrop-blur-sm">
      <table ref={ref} className={cn('w-full text-sm', className)} {...props}>{children}</table>
    </div>
  )
);
Table.displayName = 'Table';

const TableHeader = forwardRef<HTMLTableSectionElement, HTMLAttributes<HTMLTableSectionElement>>(
  ({ className, children, ...props }, ref) => (
    <thead ref={ref} className={cn('bg-[rgba(0,240,255,0.03)] border-b border-[rgba(255,255,255,0.06)]', className)} {...props}>{children}</thead>
  )
);
TableHeader.displayName = 'TableHeader';

const TableBody = forwardRef<HTMLTableSectionElement, HTMLAttributes<HTMLTableSectionElement>>(
  ({ className, children, ...props }, ref) => (
    <tbody ref={ref} className={cn('divide-y divide-[rgba(255,255,255,0.04)]', className)} {...props}>{children}</tbody>
  )
);
TableBody.displayName = 'TableBody';

const TableRow = forwardRef<HTMLTableRowElement, HTMLAttributes<HTMLTableRowElement>>(
  ({ className, children, ...props }, ref) => (
    <tr ref={ref} className={cn('hover:bg-[rgba(0,240,255,0.03)] transition-colors duration-150', className)} {...props}>{children}</tr>
  )
);
TableRow.displayName = 'TableRow';

const TableHead = forwardRef<HTMLTableCellElement, HTMLAttributes<HTMLTableCellElement>>(
  ({ className, children, ...props }, ref) => (
    <th ref={ref} className={cn('px-5 py-3.5 text-left text-[10px] font-bold text-[#64748b] uppercase tracking-[0.15em]', className)} {...props}>{children}</th>
  )
);
TableHead.displayName = 'TableHead';

const TableCell = forwardRef<HTMLTableCellElement, HTMLAttributes<HTMLTableCellElement>>(
  ({ className, children, ...props }, ref) => (
    <td ref={ref} className={cn('px-5 py-4 text-[#cbd5e1] font-medium', className)} {...props}>{children}</td>
  )
);
TableCell.displayName = 'TableCell';

export { Table, TableHeader, TableBody, TableRow, TableHead, TableCell };
