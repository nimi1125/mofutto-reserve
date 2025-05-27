export default function TableHeaderCell({ children, className = '' }) {
    return (
        <td className={`px-1 py-1 border-gray-400 border-b-2 bg-gray-100 text-center ${className}`}>
            {children}
        </td>
    );
}
