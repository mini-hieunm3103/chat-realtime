import React, {lazy} from "react";
import {useToggle} from "@/Helper/hooks.js";
import {asset, userAvatarText} from "@/Helper/functions.js";

const ShowUserModal = lazy(() => (import('@/Components/Modals/ShowUserModal.jsx')))
function UserAvatar(
    {
        isOnline=false,
        showProfile = false,
        size=false,
        className='',
        user,
        ...props
    }
)
{
    if (!user)
        return null
    const {on: open, toggle} = useToggle()
    return (
        <>
            <div className={
                "cursor-default avatar "
                + ((size) ? " avatar-" + size : " ")
                + ((isOnline) ? " avatar-online" : " ")
                + ((!user.avatar) ? " bg-primary text-white " : " ")
                + className
            }
                 onClick={toggle}
                 {...props}
            >
                {(user.avatar)
                    ? <img className="avatar-img" src={asset(user.avatar.path)} alt={user.name}/>
                    : <span style={(size === "xl") ? {fontSize: 38, fontWeight: "bold"} : {fontWeight: "bold"}}>{userAvatarText(user.name)}</span>}
            </div>
            {showProfile && <ShowUserModal isShowing={open} hide={toggle} user={user}/>}
        </>
    )
}

export default React.memo(UserAvatar)
