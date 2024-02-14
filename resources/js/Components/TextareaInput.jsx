import { forwardRef, useEffect, useRef } from 'react';

export default forwardRef(function TextareaInput({error='', className = '', isFocused = false, children, ...props }, ref) {
    const input = ref ? ref : useRef();

    useEffect(() => {
        if (isFocused) {
            input.current.focus();
        }
    }, []);

    return (
        <textarea
            className={"form-control form-control-lg "+className+ ((error) ? " is-invalid" : null)}
            data-autosize="true"
            {...props}
        >
            {children}
        </textarea>
        // <input
        //     {...props}
        //     type={type}
        //     className={
        //         'form-control form-control-lg ' + className + ((error) ? " is-invalid" : null)
        //     }
        //     ref={input}
        // />
    );
});
