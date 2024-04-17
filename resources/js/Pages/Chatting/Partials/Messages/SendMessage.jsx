import React, {useEffect, useRef} from "react";
import {useForm} from "@inertiajs/react";
import TextareaInput from "@/Components/Input/TextareaInput.jsx";
import {asset} from "@/Helper/functions.js";

const SendMessage = ({channelId, channelType}) => {
    const { data, setData, post, reset, processing, recentlySuccessful } = useForm({
        message_type: 'text',
        text_content: '',
        channel_id: channelId,
        channel_type: channelType,
    });
    const sendMessage = (e) => {
        e.preventDefault()
        post(route('message.postMessage'), {
            onSuccess: ()=> {
                reset('text_content');
            }
        })
    }
    return (
        <div id="" className="chat-footer border-top py-4 py-lg-6 px-lg-8">
            <div className="container-xxl">
                <form onSubmit={sendMessage} className="border-0">
                    <div className="form-row align-items-center">
                        <div className="col-auto">
                            <div className="btn btn-ico btn-sm btn-primary rounded-circle">
                                <span className="fe-plus"></span>
                            </div>
                        </div>
                        <div className="col">
                            <div className="input-group d-flex align-items-center border rounded-pill border-1 border-secondary">
                                <textarea
                                    className="form-control form-control-lg bg-transparent border-0"
                                    style={{resize: "none"}}
                                    placeholder="Type your message..." rows="1" data-emoji-input=""
                                    value={data.text_content}
                                    onChange={(e) => {
                                        setData('text_content', e.target.value)
                                    }}
                                />
                                <div className="btn btn-ico btn-primary rounded-circle btn-sm mr-4">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                         fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"
                                         stroke-linejoin="round" className="feather feather-smile">
                                        <circle cx="12" cy="12" r="10"></circle>
                                        <path d="M8 14s1.5 2 4 2 4-2 4-2"></path>
                                        <line x1="9" y1="9" x2="9.01" y2="9"></line>
                                        <line x1="15" y1="9" x2="15.01" y2="9"></line>
                                    </svg>
                                </div>
                            </div>
                        </div>

                        <div className="col-auto">
                            {data.text_content
                                ? <button className="btn btn-ico btn-primary rounded-circle" type="submit">
                                    <span className="fe-send mr-3"></span>
                                </button>
                                : <div className="btn btn-ico d-flex justify-content-center align-items-center">
                                    <img src={asset('/images/emoji/like.png')} alt="like"
                                         style={{width: 30, height: 30}}/>
                                </div>
                            }
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default React.memo(SendMessage)
