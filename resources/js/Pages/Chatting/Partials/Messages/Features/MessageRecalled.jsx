import React from "react";

export default function MessageRecalled({position="left", ...props}) {
    return (
        <div
            className={"message-content text-white " + ((position === "left") ? "bg-light" : "bg-primary")}
            {...props}
        >
            <span style={
                position === "left" ? {color: "#6b6c6d"} : {color: "#ffffff91"}
            }>Message recalled</span>
        </div>
    )
}
