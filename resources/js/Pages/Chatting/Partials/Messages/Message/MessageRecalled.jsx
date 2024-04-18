import React from "react";

export default function MessageRecalled({position="left"}) {
    return (
        <span style={
            position === "left" ? {color: "#6b6c6d"} : {color: "#ffffff91"}
        }>Message recalled</span>
    )
}
