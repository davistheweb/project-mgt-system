import { Link } from '@inertiajs/react';
import React from 'react';

export const Pagination: React.FC<{
    links: { label: string; active: boolean; url: string }[];
}> = ({ links }) => {
    return (
        <nav className="mt-4 text-center">
            {links.map((link, i) => (
                <Link
                    key={i}
                    href={link.url || '#'}
                    dangerouslySetInnerHTML={{ __html: link.label }}
                    className={`rounded-lg px-3 py-2 text-xs text-gray-200 ${link.active ? 'bg-gray-950' : ''} ${!link.url ? 'cursor-not-allowed !text-gray-500' : 'hover:bg-gray-950'}`}
                />
            ))}
        </nav>
    );
};
