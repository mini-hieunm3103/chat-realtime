import React from "react";

export default function GroupAvatar({name, size, className}) {
    let avatarText = "";
    const splitName = name.split(" ");
    const limit = 3;
    for (let i = 0; i < limit; i++) {
        avatarText += splitName[i].charAt(0)
    }
    return (
        <div className={
            "avatar "
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
