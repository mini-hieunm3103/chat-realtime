import React, {useState, useEffect, useContext} from "react";
import {useEchoChatUsersId, useGetUsers} from "@/Helper/hooks.js";
import {useFetch} from "@/Helper/hooks.js";
import {convertBaseJs} from "@/Helper/functions.js";
import UserAvatar from "@/Components/UserAvatar.jsx";
import GroupAvatar from "@/Components/GroupAvatar.jsx";
import {usePage} from "@inertiajs/react";
import SearchInput from "@/Components/Input/SearchInput.jsx";
import AuthenticatedContext from "@/Layouts/Authenticated/AuthenticatedContext.jsx";
export default function Dialog({startUp}){
    const {allUserOnlineIds} = useContext(AuthenticatedContext)
    const user = usePage().props.auth.data;
    const [keyword, setKeyword] = useState("")
    const [dialogCards, setDialogCards] = useState([]);
    const allUsersOnline = useGetUsers(keyword,true);
    const {data:getDialog, isPending, error} = useFetch(route('message.dialog', {keyword: keyword}));
    useEffect(()=> {
        if(getDialog.hasOwnProperty('data') && !isPending ){
            setDialogCards(getDialog.data);
        }
    }, [isPending])
    return (
        <div className={"tab-pane fade h-100 " +(startUp && "show active")} id="tab-content-dialogs" role="tabpanel">
            <div className="d-flex flex-column h-100">

                <div className="hide-scrollbar">
                    <div className="container-fluid py-6">

                        <h2 className="font-bold mb-6">Chats</h2>
                        <SearchInput keyword={keyword} setKeyword={setKeyword} placeHolder="Search for name or group" />
                        <div className="text-center hide-scrollbar d-flex my-7" data-horizontal-scroll="">
                            <div className="d-block text-reset mr-7 mr-lg-6">
                                <UserAvatar
                                    user={user}
                                    isOnline={false}
                                    className=" mb-3 "
                                />
                                <div className="small text-truncate">You</div>
                            </div>
                            {
                                allUsersOnline.map((e, i) => {
                                    return (
                                        <a href="#" className="d-block text-reset mr-7 mr-lg-6">
                                            <UserAvatar
                                                user={e}
                                                isOnline={true}
                                                className=" mb-3 "
                                            />
                                            <div className="small text-truncate">{(e.name.split(" ")[0])}</div>
                                        </a>
                                    )
                                })
                            }

                        </div>
                        {/*Global Chat*/}

                        {dialogCards.length>0
                        ?   <nav className="nav d-block list-discussions-js mb-n6">
                                {dialogCards.map((dialogCard, i) => {
                                    const link = (dialogCard.type ==="group") ? "/t/" + convertBaseJs("gr-"+dialogCard.detail.id, 37, 10) : "/t/"+convertBaseJs("dm-"+dialogCard.detail.id, 37, 10);
                                    return (
                                        <a className="text-reset nav-link p-0 mb-3" href={link}>
                                            <div className="card card-active-listener">
                                                <div className="card-body">
                                                    <div className="media">
                                                    {
                                                        (dialogCard.type ==="group")
                                                        ? <GroupAvatar
                                                            name = {dialogCard.detail.name}
                                                            className = " mr-5"
                                                        />
                                                        : <UserAvatar
                                                            user = {dialogCard.detail}
                                                            isOnline = {allUserOnlineIds.includes(dialogCard.detail.id)}
                                                            className = " mr-5"
                                                         />
                                                    }
                                                        <div className="media-body overflow-hidden">
                                                            <div className="d-flex align-items-center mb-1">
                                                                <h6 className="text-truncate mb-0 mr-auto">{dialogCard.detail.name}</h6>
                                                                <p className="small text-muted text-nowrap ml-4">{(dialogCard.lastestMessage)? dialogCard.lastestMessage.sendTime.full : dialogCard.detail.time}</p>
                                                            </div>
                                                            {(dialogCard.lastestMessage) ? (<div className="text-truncate">{dialogCard.lastestMessage.user.name}: {dialogCard.lastestMessage.content}</div>) : (dialogCard.detail.owner.name + " has created group")}
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="badge badge-circle badge-light badge-border-light badge-top-right">
                                                    <i className="fi fi-ss-thumbtack"></i>
                                                </div>
                                            </div>
                                        </a>
                                    )
                                })}
                            </nav>
                        : null}
                    </div>
                </div>
            </div>
        </div>
    )
}
