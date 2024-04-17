import { forwardRef, useEffect, useRef } from 'react';

export default function TextareaInput({ref, error='', className = '', isFocused = false, autoSize = true, children, ...props }) {
    return (
        <textarea
            className={"form-control form-control-lg "+className+ ((error) ? " is-invalid" : "")}
            style={{resize: "none"}}
            {...props}
        />
    );
};
