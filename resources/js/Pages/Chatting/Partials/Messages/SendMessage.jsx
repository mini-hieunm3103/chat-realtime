import React, {useEffect, useRef} from "react";
import {useForm} from "@inertiajs/react";
import {getFileType} from "@/Helper/functions.js";
import {maxMessageFileSize} from "@/Helper/config.js";
import Like from "@/Components/Icons/Like.jsx";

const SendMessage = ({channelId, channelType}) => {
    const selectedFileInputRef = useRef(null)
    const sendMessageBtnRef = useRef(null)
    const { data, setData, post, reset, processing, recentlySuccessful } = useForm({
        message_type: 'text',
        message_file: null,
        message_text: '',
        channel_id: channelId,
        channel_type: channelType,
    });
    const onChooseFile = () =>
        selectedFileInputRef.current.click();
    const handleOnChange = (event) => {
        const selectedFile = event.target.files[0];
        if (!selectedFile) return;

        const isFileSizeAllowed = selectedFile.size <= maxMessageFileSize;
        const fileType = getFileType(selectedFile.type);

        if (isFileSizeAllowed && fileType){
            setData({
                ...data,
                'message_type': fileType,
                'message_file': selectedFile,
            });
        }
    }
    useEffect(() => {
        if (data.message_file && data.message_type)
            sendMessageBtnRef.current.click();
    }, [data.message_file, data.message_type]);

    const sendMessage = (e) => {
        e.preventDefault()
        post(route('message.postMessage'), {
            onSuccess: ()=> {
                reset('message_text', 'message_file', 'message_type');
            }
        })
    }
    return (
        <div id="" className="chat-footer border-top py-4 py-lg-6 px-lg-8">
            <div className="container-xxl">
                <form onSubmit={sendMessage} className="border-0">
                    <div className="form-row align-items-center">
                        <div className="col-auto" onClick={onChooseFile}>
                            <div className="btn btn-ico btn-sm btn-primary rounded-circle">
                                <span className="fe-plus"></span>
                                <input
                                    ref={selectedFileInputRef}
                                    className="d-none"
                                    onChange={handleOnChange}
                                    type="file"/>
                            </div>
                        </div>
                        <div className="col">
                            <div
                                className="input-group d-flex align-items-center border rounded-pill border-1 border-secondary">
                                <textarea
                                    className="form-control form-control-lg bg-transparent border-0"
                                    style={{resize: "none"}}
                                    placeholder="Type your message..." rows="1" data-emoji-input=""
                                    value={data.message_text}
                                    onChange={(e) => {
                                        setData('message_text', e.target.value)
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

                        <button className="col-auto btn btn-ico" ref={sendMessageBtnRef} type="submit">
                            {data.message_text || data.message_file
                                // ? <IoMdSend style={{color: "rgb(1, 118, 255)"}} size={"2rem"}/>
                                ? <span className="fe-send mr-3 text-primary icon-lg" style={{fill: "blue"}}></span>
                                : <div className="d-flex justify-content-center align-items-center">
                                    <Like style={{width: 30, height: 30}}/>
                                    {/*    insert mimeType: ico -> message_type*/}
                                </div>
                            }
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default React.memo(SendMessage)
