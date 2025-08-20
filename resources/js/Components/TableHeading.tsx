import { ChevronDown, ChevronUp } from 'lucide-react';
import React from 'react';

interface ITableHeading {
    name: string;
    sortable?: boolean;
    sort_field: any;
    sort_direction: any;
    sortChanged: (name: string) => void;
    children: React.ReactNode;
}

const TableHeading: React.FC<ITableHeading> = ({
    name,
    sortable = true,
    sort_field = null,
    sort_direction = null,
    sortChanged = () => {},
    children,
}) => {
    return (
        <th onClick={() => sortChanged(name)}>
            <span className="flex cursor-pointer items-center justify-between gap-1 px-3 py-3">
                {children}
                {sortable && (
                    <span>
                        <ChevronUp
                            size={16}
                            className={`w-4 ${sort_field === name && sort_direction === 'asc' ? 'text-white' : ''}`}
                        />
                        <ChevronDown
                            size={16}
                            className={`-mt-2 w-4 ${sort_field === name && sort_direction === 'desc' ? 'text-white' : ''}`}
                        />
                    </span>
                )}
            </span>
        </th>
    );
};

export default TableHeading;
