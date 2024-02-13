import { forwardRef, useEffect, useRef } from 'react';

export default forwardRef(function TextInput({error='', type = 'text', className = '', isFocused = false, ...props }, ref) {
    const input = ref ? ref : useRef();

    useEffect(() => {
        if (isFocused) {
            input.current.focus();
        }
    }, []);

    return (
        <input
            {...props}
            type={type}
            className={
                'form-control form-control-lg ' + className + ((error) ? " is-invalid" : null)
            }
            ref={input}
        />
    );
});
