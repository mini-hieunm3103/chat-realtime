import React from "react";
import {adventurer, adventurerNeutral} from "@dicebear/collection";
import {createAvatar} from "@dicebear/core";

function UserAvatar(
    {
        isOnline=false,
        size=false,
        className='',
        user
    }
)
{
    const avatarStyleArr = [
        adventurer,
        adventurerNeutral
    ]
    const avatarDb = JSON.parse(user.avatar)
    const avatarDiceBear = createAvatar(avatarStyleArr[avatarDb.style.position], avatarDb);
    const svg = avatarDiceBear.toString();
    return (
        <div className= {
            "avatar "
             +((size) ? " avatar-"+size : " ")
             + ((isOnline) ? " avatar-online" : " ")
             + ((user.avatar) ? " bg-primary text-white " : " ")
             + className
        }>
            {(user.avatar)
                ? <div dangerouslySetInnerHTML={{__html: svg}}/>
                : <span> {user.name.charAt(0)} </span>
            }
        </div>
    )
}
export default React.memo(UserAvatar)
