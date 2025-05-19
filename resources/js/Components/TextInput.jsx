import React, { forwardRef, useEffect, useRef } from 'react';

const TextInput = forwardRef(function TextInput(
    { type = 'text', className = '', isFocused = false, ...props },
    ref
) {
    const inputRef = useRef();

    useEffect(() => {
        if (isFocused) {
            inputRef.current?.focus();
        }
    }, [isFocused]);

    return (
        <input
            type={type}
            className={
                'rounded-2xl border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 ' +
                className
            }
            ref={(el) => {
                inputRef.current = el;
                if (typeof ref === 'function') {
                    ref(el);
                } else if (ref) {
                    ref.current = el;
                }
            }}
            {...props} 
        />
    );
});

export default TextInput;
