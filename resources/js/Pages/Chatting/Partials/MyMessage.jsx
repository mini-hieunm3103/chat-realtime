import DropdownMessage from "@/Pages/Chatting/Partials/DropdownMessage.jsx";
import Highlighter from "react-highlight-words";

export default function MyMessage({message, keyword}){
    const auth = message.user;
    return (
        <div className="message message-right">

            <div className="message-body">

                <div className="message-row">
                    <div className="d-flex align-items-center justify-content-end">
                        <DropdownMessage />
                        <div className="message-content bg-primary text-white">

                            <div>
                                <Highlighter
                                    highlightClassName="highlighted-text"
                                    searchWords={[keyword]}
                                    autoEscape={true}
                                    textToHighlight={message.content}
                                />
                            </div>

                            <div className="mt-1">
                                <small className="opacity-65">{message.sendTime.full}</small>
                            </div>
                            <div className="mt-1">
                                <small className="opacity-65">{message.id}</small>
                            </div>
                        </div>

                    </div>
                </div>

            </div>
        </div>
    )
}
