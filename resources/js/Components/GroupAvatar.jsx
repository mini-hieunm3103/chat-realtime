import React from "react";

export default function GroupAvatar({name, size, className}) {
    if (!name) {
        return null;
    }
    let avatarText = "";
    const splitName = name.split(" ");
    let limit;
    if (splitName.length >= 3) {
        limit = 3;
    } else {
        limit = splitName.length
    }
    for (let i = 0; i < limit; i++) {
        avatarText += splitName[i].charAt(0)
    }
    return (
        <div className={
            "cursor-default avatar "
            + ((size) ? " avatar-" + size : " ")
            + " bg-success text-white "
            + className
        }
        >
            <span style={(size === "xl") ? {
                fontSize: 38,
                fontWeight: "bold"
            } : {fontWeight: "bold"}}>{avatarText}</span>
        </div>
    )
}
