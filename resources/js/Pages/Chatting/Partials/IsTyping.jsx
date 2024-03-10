import UserAvatar from "@/Components/UserAvatar.jsx";

export default function IsTyping({other}){
    return (
        <div className="message">
            <UserAvatar
                user={other}
                isOnline={true}
                size="sm"
                className=" mr-4 mr-lg-5"
            />
            <div className="message-body">

                <div className="message-row">
                    <div className="d-flex align-items-center">

                        <div className="message-content bg-light">
                            <div>Anna is typing<span className="typing-dots"><span>.</span><span>.</span><span>.</span></span>
                            </div>
                        </div>

                    </div>
                </div>

            </div>
        </div>
    )
}
