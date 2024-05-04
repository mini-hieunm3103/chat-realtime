import React from "react";
import {asset, groupAvatarText} from "@/Helper/functions.js";

export default function GroupAvatar({group, size, className=""}) {
    if (!group) {
        return null;
    }
    return (
        <div className={
            "cursor-default avatar "
            + ((size) ? " avatar-" + size : " ")
            + ((!group.avatar) ? " bg-success text-white " : " ")
            + className
        }
        >
            {group.avatar
                ? <img className="avatar-img" src={asset(group.avatar.path)} alt={group.name}/>
                : <span style={
                    (size === "xl")
                        ? {fontSize: 32, fontWeight: "bold"}
                        : {fontWeight: "bold"}
                }
                >{groupAvatarText(group.name)}</span>
            }
        </div>
    )
}
