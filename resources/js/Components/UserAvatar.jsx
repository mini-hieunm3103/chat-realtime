import React, {lazy} from "react";
import {adventurer, adventurerNeutral} from "@dicebear/collection";
import {createAvatar} from "@dicebear/core";
import useModal from "@/Helper/useModal.jsx";
const ShowUserModal = lazy(() => (import('@/Components/Modals/ShowUserModal.jsx')))
function UserAvatar(
    {
        isOnline=false,
        showProfile = false,
        size=false,
        className='',
        user
    }
)
{
    const {isShowing, toggle} = useModal()
    const avatarDb = JSON.parse(user.avatar)
    const patternLink =
        /(https:\/\/www\.|http:\/\/www\.|https:\/\/|http:\/\/)?[a-zA-Z]{2,}(\.[a-zA-Z]{2,})(\.[a-zA-Z]{2,})?\/[a-zA-Z0-9]{2,}|((https:\/\/www\.|http:\/\/www\.|https:\/\/|http:\/\/)?[a-zA-Z]{2,}(\.[a-zA-Z]{2,})(\.[a-zA-Z]{2,})?)|(https:\/\/www\.|http:\/\/www\.|https:\/\/|http:\/\/)?[a-zA-Z0-9]{2,}\.[a-zA-Z0-9]{2,}\.[a-zA-Z0-9]{2,}(\.[a-zA-Z0-9]{2,})?/g;
    const isLink = patternLink.test(avatarDb)
    const isNull = Object.is(avatarDb, null)
    const avatarStyleArr = [
        adventurer,
        adventurerNeutral
    ]
    const svg = (!isLink && !isNull) ?  createAvatar(avatarStyleArr[avatarDb.style.position], avatarDb).toString() : false;
    return (
        <>
            <div className={
                "avatar "
                + ((size) ? " avatar-" + size : " ")
                + ((isOnline) ? " avatar-online" : " ")
                + ((isNull) ? " bg-primary text-white " : " ")
                + className
            }
                 onClick={toggle}
            >
                {(svg) && <div dangerouslySetInnerHTML={{__html: svg}}/>}
                {(isLink) && <img src={avatarDb} alt="avatar" className="avatar-img" style={{borderRadius: "50%"}}/>}
                {(isNull) && <span style={(size === "xl") ? {fontSize: 38, fontWeight: "bold"} : {fontWeight: "bold"}}>{user.name.charAt(0)}</span>}
            </div>
            {showProfile && <ShowUserModal isShowing={isShowing} hide={toggle} user={user}/>}
        </>
    )
}

export default React.memo(UserAvatar)