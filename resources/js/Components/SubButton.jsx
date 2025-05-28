export default function SubButton({
    className = '',
    disabled,
    children,
    ...props
}) {
    return (
        <button
            {...props}
            className={
                `inline-flex items-center  rounded-3xl px-5 py-2 border border-emerald-600 border-transparent bg-white px-4 py-2 text-xs font-semibold uppercase tracking-widest text-emerald-600 transition duration-150 ease-in-out hover:bg-emerald-600 hover:text-white focus:bg-emerald-600 focus:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 active:bg-emerald-900 ${
                    disabled && 'opacity-25'
                } ` + className
            }
            disabled={disabled}
        >
            {children}
        </button>
    );
}
