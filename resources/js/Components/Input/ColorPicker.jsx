import React, { useCallback, useRef, useState } from "react";
import { HexColorPicker } from "react-colorful";

import useClickOutside from "@/Helper/useClickOutside.jsx";
// https://codesandbox.io/s/opmco
export const ColorPicker = ({ color, onChange }) => {
    const popover = useRef();
    const [isOpen, toggle] = useState(false);

    const close = useCallback(() => toggle(false), []);
    useClickOutside(popover, close);
    return (
        <div className="picker">
            <div
                className="swatch"
                onClick={() => toggle(true)}
            >
                <div
                    className="show-color"
                    style={{ backgroundColor: `#${color}` }}
                />
                <span className="pl-5 pr-5">{`#${color}`}</span>
            </div>

            {isOpen && (
                <div className="popover" ref={popover}>
                    <HexColorPicker color={color} onChange={onChange} />
                </div>
            )}
        </div>
    );
};
