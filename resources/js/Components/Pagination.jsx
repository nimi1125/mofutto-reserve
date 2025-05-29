import { Link } from '@inertiajs/react';

export default function Pagination({ links }) {
    return (
        <div className="mt-6 flex justify-center">
            {links.map((link, key) => (
                <Link
                    key={key}
                    href={link.url || ''}
                    className={`px-3 py-1 mx-1 rounded ${
                        link.active
                            ? 'bg-emerald-500 text-white'
                            : 'bg-white border text-gray-600'
                    } ${!link.url ? 'pointer-events-none opacity-50' : ''}`}
                    dangerouslySetInnerHTML={{ __html: link.label }}
                />
            ))}
        </div>
    );
}
